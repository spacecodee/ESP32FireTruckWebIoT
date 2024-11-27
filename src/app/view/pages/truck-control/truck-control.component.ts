import { Component } from '@angular/core';
import { LedControlComponent } from '@app/features/fire-truck/components/controls/led-control/led-control.component';
import { MovementPadComponent } from '@app/features/fire-truck/components/controls/movement-pad/movement-pad.component';
import { ServoControlComponent } from '@app/features/fire-truck/components/controls/servo-control/servo-control.component';

@Component({
  selector: 'app-truck-control',
  standalone: true,
  imports: [LedControlComponent, ServoControlComponent, MovementPadComponent],
  templateUrl: './truck-control.component.html',
  styleUrl: './truck-control.component.scss',
})
export class TruckControlComponent {}
