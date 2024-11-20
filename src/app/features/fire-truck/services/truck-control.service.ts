import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Direction, TruckCommand } from '../types/truck.types';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TruckControlService {
  private platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<TruckCommand>;
  private readonly WS_ENDPOINT = 'ws://your-esp32-ip:port';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  private initializeWebSocket(): void {
    this.socket$ = new WebSocketSubject(this.WS_ENDPOINT);
  }

  move(direction: Direction): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.socket$?.next({
      command: 'move',
      value: direction,
    });
  }

  setPump(active: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.socket$?.next({
      command: 'pump',
      value: active,
    });
  }

  disconnect(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.socket$?.complete();
  }
}
