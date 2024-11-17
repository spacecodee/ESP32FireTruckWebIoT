import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  controlCar(direction: 'forward' | 'backward' | 'left' | 'right'): void {
    console.log(`Moving car: ${direction}`);
  }

  toggleWaterPump(): void {
    console.log('Toggling water pump');
  }
}
