import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { BehaviorSubject, timer } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { ConnectionMessage } from '@features/fire-truck/types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<ConnectionMessage>;
  private readonly WS_ENDPOINT = 'ws://192.168.215.3:81';
  private previousConnectionState = false;
  private readonly RETRY_SECONDS = 3;

  private connectionStatus = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatus.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  private initializeWebSocket(): void {
    console.log('%c🔌 Attempting to connect...', 'color: #3b82f6');

    this.socket$ = webSocket<ConnectionMessage>({
      url: this.WS_ENDPOINT,
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (msg) => JSON.stringify(msg),
      openObserver: {
        next: () => {
          console.log('%c🔌 WebSocket connection opened', 'color: #10b981');
        },
      },
      closeObserver: {
        next: () => {
          console.log('%c🔌 WebSocket connection closed', 'color: #ef4444');
          this.reconnect();
        },
      },
    });

    this.socket$
      .pipe(
        retry({
          delay: (error, retryCount) => {
            //console.error('%c❌ Connection Error:', 'color: #ef4444', error);
            //console.log('%c🔄 Retrying connection...', 'color: #3b82f6');
            return timer(this.RETRY_SECONDS * 1000);
          },
        }),
        tap({
          error: (err) =>
            console.error('%c❌ Connection Error:', 'color: #ef4444', err),
        }),
      )
      .subscribe({
        next: (message: ConnectionMessage) => {
          this.logMessage(message);
          if (
            message.type === 'connection' &&
            message.connected !== this.previousConnectionState
          ) {
            this.connectionStatus.next(message.connected);
            this.previousConnectionState = message.connected;
          }
        },
        error: (error) => {
          console.error('%c❌ Connection Error:', 'color: #ef4444', error);
          this.connectionStatus.next(false);
          this.previousConnectionState = false;
          this.reconnect();
        },
      });
  }

  private reconnect(): void {
    timer(this.RETRY_SECONDS * 1000).subscribe(() => {
      console.log('%c🔄 Attempting to reconnect...', 'color: #3b82f6');
      this.initializeWebSocket();
    });
  }

  private logMessage(message: ConnectionMessage) {
    const timestamp = new Date().toLocaleTimeString();
    const style = message.connected ? 'color: #10b981' : 'color: #ef4444';

    console.log(`%c[${timestamp}] 📡 ESP32:`, style, {
      type: message.type,
      connected: message.connected,
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
