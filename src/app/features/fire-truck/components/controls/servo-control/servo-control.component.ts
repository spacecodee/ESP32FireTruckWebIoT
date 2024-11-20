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
  constructor(private servoControl: ServoControlService) {}

  sweep(startAngle: number, endAngle: number): void {
    this.servoControl.sweep(startAngle, endAngle);
  }
}
