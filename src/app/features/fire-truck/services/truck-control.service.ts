// src/app/features/fire-truck/services/truck-control.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  Direction,
  MoveCommand,
  PumpCommand,
  PumpStatus,
} from '../types/truck.types';
import { WebSocketService } from '@core/services/websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class TruckControlService {
  private readonly pumpState = new BehaviorSubject<boolean>(false);
  pumpState$ = this.pumpState.asObservable();
  private readonly direction$ = new BehaviorSubject<Direction>('stop');

  constructor(private readonly webSocketService: WebSocketService) {
    this.webSocketService.messages$
      .pipe(
        filter(
          (message): message is PumpStatus =>
            message !== null &&
            'type' in message &&
            message.type === 'status' &&
            'pump' in message,
        ),
      )
      .subscribe((status) => {
        this.pumpState.next(status.pump);
      });

    // Listen for connection status
    this.webSocketService.connectionStatus$.subscribe((connected) => {
      if (!connected) {
        // Reset states when disconnected
        this.direction$.next('stop');
        this.pumpState.next(false);
      }
    });
  }

  move(direction: Direction): void {
    const command: MoveCommand = { command: 'motor', direction };
    this.webSocketService.sendMessage(command);
  }

  setPump(state: boolean): void {
    const command: PumpCommand = { command: 'pump', state };
    this.webSocketService.sendMessage(command);
  }
}
