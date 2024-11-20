import { Injectable } from '@angular/core';
import { WebSocketService } from '@core/services/websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class LedControlService {
  constructor(private ws: WebSocketService) {}

  setLed(led: 'red' | 'green', state: boolean): void {
    this.ws.sendMessage({
      command: 'led',
      led,
      state,
    });
  }
}
