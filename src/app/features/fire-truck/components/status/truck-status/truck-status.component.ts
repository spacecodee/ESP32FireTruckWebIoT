import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckControlService } from '@features/fire-truck/services/truck-control.service';
import { Subscription } from 'rxjs';
import { Direction } from '@features/fire-truck/types/truck.types';

@Component({
  selector: 'app-truck-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './truck-status.component.html',
})
export class TruckStatusComponent implements OnInit, OnDestroy {
  isConnected = false;
  currentDirection: Direction = 'stop';
  batteryLevel = 85; // Simulated value
  isPumpActive = false;
  private subscription?: Subscription;

  constructor(private truckControl: TruckControlService) {}

  ngOnInit(): void {
    this.subscription = this.truckControl.connectionStatus$.subscribe(
      (status: boolean) => (this.isConnected = status),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
