// src/app/features/fire-truck/components/controls/led-control.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedControlService } from '@features/fire-truck/services/led-control.service';

@Component({
  selector: 'app-led-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './led-control.component.html',
})
export class LedControlComponent {
  ledStates = { red: false, green: false };

  constructor(private ledControl: LedControlService) {}

  toggleLed(led: 'red' | 'green'): void {
    this.ledStates[led] = !this.ledStates[led];
    this.ledControl.setLed(led, this.ledStates[led]);
  }
}
