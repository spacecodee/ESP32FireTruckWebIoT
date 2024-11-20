import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckControlService } from '@features/fire-truck/services/truck-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-led-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './led-control.component.html',
})
export class LedControlComponent implements OnInit, OnDestroy {
  ledStates = { red: false, green: false };
  private subscription?: Subscription;

  constructor(private truckControl: TruckControlService) {}

  ngOnInit(): void {
    this.subscription = this.truckControl.ledStatus$.subscribe(
      (status) => (this.ledStates = status),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleLed(led: 'red' | 'green'): void {
    this.truckControl.setLed(led, !this.ledStates[led]);
  }
}
