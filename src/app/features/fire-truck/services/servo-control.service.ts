import { Injectable } from '@angular/core';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServoControlService {
  private servoStatus = new BehaviorSubject<{
    angle: number;
    direction: string;
  }>({
    angle: 0,
    direction: 'stop',
  });
  servoStatus$ = this.servoStatus.asObservable();

  constructor(private ws: WebSocketService) {}

  sweep(startAngle: number, endAngle: number): void {
    this.ws.sendMessage({
      command: 'servo',
      type: 'sweep',
      startAngle,
      endAngle,
    });
  }
}
