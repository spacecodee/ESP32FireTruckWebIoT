// src/app/features/fire-truck/components/status/truck-status.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { TruckControlService } from '@features/fire-truck/services/truck-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-truck-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './truck-status.component.html',
})
export class TruckStatusComponent implements OnInit, OnDestroy {
  isConnected = false;
  currentDirection = 'stop';
  batteryLevel = 85; // Simulated for now
  isPumpActive = false;
  private subscription?: Subscription;

  constructor(
    private readonly webSocketService: WebSocketService,
    private readonly truckControl: TruckControlService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.webSocketService.connectionStatus$.subscribe(
      (status: boolean) => (this.isConnected = status),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
