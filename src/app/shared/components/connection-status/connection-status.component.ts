import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection-status.component.html',
})
export class ConnectionStatusComponent implements OnInit, OnDestroy {
  isConnected$ = this.webSocketService.connectionStatus$;
  private subscription?: Subscription;

  constructor(public webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.subscription = this.isConnected$.subscribe((connected) => {
      if (!connected) {
        console.log('%c📡 Connection Status: Disconnected', 'color: #ef4444');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
