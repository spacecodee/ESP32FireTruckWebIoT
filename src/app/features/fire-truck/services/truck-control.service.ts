// src/app/features/fire-truck/services/truck-control.service.ts
import { Injectable } from '@angular/core';
import { Direction, MoveCommand, PumpCommand } from '../types/truck.types';
import { WebSocketService } from '@core/services/websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class TruckControlService {
  constructor(private ws: WebSocketService) {}

  move(direction: Direction): void {
    const command: MoveCommand = { command: 'move', direction };
    this.ws.sendMessage(command);
  }

  setPump(state: boolean): void {
    const command: PumpCommand = { command: 'pump', state };
    this.ws.sendMessage(command);
  }
}
