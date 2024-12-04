import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { BehaviorSubject, timer } from 'rxjs';
import { retry } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {
  ConnectionMessage,
  ServoStatus,
} from '@features/fire-truck/types/truck.types';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly platformId = inject(PLATFORM_ID);
  private socket$?: WebSocketSubject<any>;
  private previousConnectionState = false;
  private readonly RETRY_SECONDS = 3;
  private isInitialized = false;

  private readonly connectionStatus = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatus.asObservable();
  private readonly messages = new BehaviorSubject<any>(null);
  messages$ = this.messages.asObservable();

  constructor(private readonly config: ConfigService) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  private initializeWebSocket(): void {
    // Prevent multiple initializations
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
    const wsUrl = this.config.getWebSocketUrl();
    console.log('%c🔌 Attempting to connect...', 'color: #3b82f6');

    this.socket$ = webSocket({
      url: wsUrl,
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (msg) => JSON.stringify(msg),
      openObserver: {
        next: () => {
          console.log('%c🔌 Connected', 'color: #10b981');
          this.connectionStatus.next(true);
        },
      },
      closeObserver: {
        next: () => {
          this.handleDisconnect();
        },
      },
    });

    this.socket$
      .pipe(
        retry({
          delay: () => {
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
          console.error('%c❌ WebSocket Error:', 'color: #ef4444', error);
          this.handleDisconnect();
        },
        complete: () => {
          this.connectionStatus.next(false);
        },
      });
  }

  private handleDisconnect(): void {
    this.connectionStatus.next(false);
    this.isInitialized = false;
    console.log('%c🔌 Disconnected', 'color: #ef4444');
  }

  private reconnect(): void {
    if (!this.isInitialized) {
      timer(this.RETRY_SECONDS * 1000).subscribe(() => {
        console.log('%c🔄 Attempting to reconnect...', 'color: #3b82f6');
        this.initializeWebSocket();
      });
    }
  }

  sendMessage(message: any): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.isInitialized) {
      this.initializeWebSocket();
    }
    this.socket$?.next(message);
  }

  disconnect(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.socket$?.complete();
    this.connectionStatus.next(false);
  }
}
