import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<any>;
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
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (msg) => JSON.stringify(msg),
    });

    this.socket$.subscribe({
      next: (message) => {
        if (message.connected !== undefined) {
          this.connectionStatus.next(message.connected);
          console.log(
            '%c📡 Connection Status:',
            'color: #3b82f6',
            message.connected,
          );
        }
      },
      error: (error) => {
        console.error('%c❌ Connection Error:', 'color: #ef4444', error);
        this.connectionStatus.next(false);
      },
    });
  }

  sendMessage(message: any): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.socket$?.next(message);
  }

  disconnect(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.socket$?.complete();
  }
}
