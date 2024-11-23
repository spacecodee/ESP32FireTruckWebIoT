import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServoControlService } from '@features/fire-truck/services/servo-control.service';

@Component({
  selector: 'app-servo-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servo-control.component.html',
})
export class ServoControlComponent {
  servoPosition$ = this.servoControl.servoPosition$;

  constructor(private readonly servoControl: ServoControlService) {}

  startSweep(): void {
    this.servoControl.startSweep();
  }
}
