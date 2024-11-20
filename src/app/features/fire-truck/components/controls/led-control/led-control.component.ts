// src/app/features/fire-truck/components/controls/led-control.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedControlService } from '@features/fire-truck/services/led-control.service';
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

  constructor(private ledControl: LedControlService) {}

  ngOnInit(): void {
    this.subscription = this.ledControl.ledStates$.subscribe(
      (states) => (this.ledStates = states),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleLed(led: 'red' | 'green'): void {
    this.ledControl.setLed(led, !this.ledStates[led]);
  }
}
