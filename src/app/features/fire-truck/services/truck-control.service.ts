import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import {
  Direction,
  WSMessage,
  MoveCommand,
  PumpCommand,
  LedCommand,
} from '../types/truck.types';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TruckControlService {
  private platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<WSMessage>;
  private readonly WS_ENDPOINT = 'ws://192.168.215.3:81';

  private connectionStatus = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatus.asObservable();

  private ledStatus = new BehaviorSubject<{ red: boolean; green: boolean }>({
    red: false,
    green: false,
  });
  ledStatus$ = this.ledStatus.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  move(direction: Direction): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const command: MoveCommand = { command: 'move', direction };
    this.socket$?.next(command);
  }

  setPump(state: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const command: PumpCommand = { command: 'pump', state };
    this.socket$?.next(command);
  }

  setLed(led: 'red' | 'green', state: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const command: LedCommand = { command: 'led', led, state };
    this.socket$?.next(command);
  }

  disconnect(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.socket$?.complete();
  }

  private initializeWebSocket(): void {
    this.socket$ = new WebSocketSubject<WSMessage>({
      url: this.WS_ENDPOINT,
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (msg) => JSON.stringify(msg),
    });

    this.socket$.subscribe({
      next: (message) => {
        if ('type' in message && message.type === 'status') {
          this.ledStatus.next(message.leds);
          console.log('%c📡 LED Status:', 'color: #3b82f6', message.leds);
        }
      },
      error: console.error,
    });
  }
}
