import { Injectable } from '@angular/core';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LedStatus } from '../types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class LedControlService {
  private readonly ledStates = new BehaviorSubject<{
    red: boolean;
    green: boolean;
  }>({
    red: false,
    green: false,
  });
  ledStates$ = this.ledStates.asObservable();

  constructor(private readonly webSocketService: WebSocketService) {
    this.webSocketService.messages$
      .pipe(
        filter(
          (message): message is LedStatus =>
            message !== null &&
            'type' in message &&
            message.type === 'status' &&
            'led_red' in message &&
            'led_green' in message,
        ),
      )
      .subscribe((status) => {
        this.ledStates.next({
          red: status.led_red,
          green: status.led_green,
        });
      });
  }

  setLed(led: 'red' | 'green', state: boolean): void {
    this.webSocketService.sendMessage({
      command: 'led',
      led,
      state,
    });
  }
}
