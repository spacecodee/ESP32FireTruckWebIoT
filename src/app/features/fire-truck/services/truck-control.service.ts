import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import { Direction, TruckCommand } from '../types/truck.types';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TruckControlService {
  private platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<TruckCommand>;
  private readonly WS_ENDPOINT = 'ws://192.168.215.3:81';

  private connectionStatus = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatus.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  private initializeWebSocket(): void {
    this.socket$ = new WebSocketSubject({
      url: this.WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('WebSocket connected');
          this.connectionStatus.next(true);
        },
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket disconnected');
          this.connectionStatus.next(false);
        },
      },
    });
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
