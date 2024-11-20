import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckControlService } from '@features/fire-truck/services/truck-control.service';

@Component({
  selector: 'app-led-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './led-control.component.html',
})
export class LedControlComponent {
  redLedState = false;
  greenLedState = false;

  constructor(private truckControl: TruckControlService) {}

  toggleLed(led: 'red' | 'green'): void {
    const newState = led === 'red' ? !this.redLedState : !this.greenLedState;

    if (led === 'red') {
      this.redLedState = newState;
    } else {
      this.greenLedState = newState;
    }

    this.truckControl.setLed(led, newState);
  }
}
