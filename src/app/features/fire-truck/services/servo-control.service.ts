import { Injectable } from '@angular/core';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ServoStatus } from '../types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class ServoControlService {
  private servoPosition = new BehaviorSubject<number>(0);
  servoPosition$ = this.servoPosition.asObservable();

  constructor(private ws: WebSocketService) {
    this.ws.messages$
      .pipe(
        filter(
          (message): message is ServoStatus =>
            message !== null &&
            'type' in message &&
            message.type === 'servo_status',
        ),
      )
      .subscribe((message) => {
        this.servoPosition.next(message.position);
      });
  }

  startSweep(): void {
    this.ws.sendMessage({ command: 'servo' });
  }
}
