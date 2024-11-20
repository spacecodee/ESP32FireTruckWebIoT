import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TruckControlService } from '../../../services/truck-control.service';

@Component({
  selector: 'app-truck-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './truck-status.component.html',
  styleUrl: './truck-status.component.scss',
})
export class TruckStatusComponent implements OnInit, OnDestroy {
  isConnected = false;
  currentDirection = 'stop';
  batteryLevel = 85; // Simulated for now
  isPumpActive = false;
  private subscription?: Subscription;

  constructor(private truckControl: TruckControlService) {}

  ngOnInit(): void {
    this.subscription = this.truckControl.connectionStatus$.subscribe(
      (status) => (this.isConnected = status),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
