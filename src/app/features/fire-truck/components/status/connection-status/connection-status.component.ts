// src/app/features/fire-truck/components/status/truck-status.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Direction } from '../../../types/truck.types';
import { TruckControlService } from '../../../services/truck-control.service';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.scss',
})
export class ConnectionStatusComponent {
  isConnected = true; // Will be dynamic when WebSocket is implemented
  currentDirection: Direction = 'stop';
  batteryLevel = 85; // Simulated - will come from ESP32
  isPumpActive = false;

  constructor(private truckControl: TruckControlService) {}
}
