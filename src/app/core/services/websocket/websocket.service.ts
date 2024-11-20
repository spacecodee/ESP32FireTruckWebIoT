import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { BehaviorSubject, timer } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {
  ConnectionMessage,
  ServoStatus,
} from '@features/fire-truck/types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<ConnectionMessage | ServoStatus>;
  private readonly WS_ENDPOINT = 'ws://192.168.215.3:81';
  private previousConnectionState = false;
  private readonly RETRY_SECONDS = 3;

  private connectionStatus = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatus.asObservable();
  private messages = new BehaviorSubject<any>(null);
  messages$ = this.messages.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  private initializeWebSocket(): void {
    console.log('%c🔌 Attempting to connect...', 'color: #3b82f6');

    this.socket$ = webSocket<ConnectionMessage | ServoStatus>({
      url: this.WS_ENDPOINT,
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (msg) => JSON.stringify(msg),
      openObserver: {
        next: () => {
          // Removed this log since we'll show status in message handler
        },
      },
      closeObserver: {
        next: () => {
          this.reconnect();
        },
      },
    });

    this.socket$
      .pipe(
        retry({
          delay: (error, retryCount) => {
            return timer(this.RETRY_SECONDS * 1000);
          },
        }),
      )
      .subscribe({
        next: (message: ConnectionMessage | ServoStatus) => {
          this.messages.next(message); // Forward messages to subscribers
          if (
            'connected' in message &&
            message.type === 'connection' &&
            message.connected !== this.previousConnectionState
          ) {
            this.connectionStatus.next(message.connected);
            this.previousConnectionState = message.connected;
            // Single connection status message with timestamp
            const timestamp = new Date().toLocaleTimeString();
            console.log(
              `%c[${timestamp}] 📡 ESP32: ${
                message.connected ? 'Connected' : 'Disconnected'
              }`,
              `color: ${message.connected ? '#10b981' : '#ef4444'}`,
            );
          }
        },
        error: (error) => {
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
