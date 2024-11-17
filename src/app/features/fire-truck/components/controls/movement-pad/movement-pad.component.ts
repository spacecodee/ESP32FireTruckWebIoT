import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckControlService } from '../../../services/truck-control.service';
import { Direction } from '../../../types/truck.types';

@Component({
  selector: 'app-movement-pad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movement-pad.component.html',
})
export class MovementPadComponent implements OnDestroy {
  activeDirection: Direction = 'stop';
  isPumpActive = false;

  constructor(private truckControl: TruckControlService) {}

  onDirectionStart(direction: Direction): void {
    this.activeDirection = direction;
    this.truckControl.move(direction);
    console.log(
      `%c🚒 Moving: ${direction}`,
      'background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px;',
    );
  }

  onDirectionEnd(): void {
    this.activeDirection = 'stop';
    this.truckControl.move('stop');
    console.log(
      '%c🛑 Stopped',
      'background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px;',
    );
  }

  togglePump(): void {
    this.isPumpActive = !this.isPumpActive;
    this.truckControl.setPump(this.isPumpActive);
    console.log(
      `%c💧 Water Pump: ${this.isPumpActive ? 'ON' : 'OFF'}`,
      'background: #10b981; color: white; padding: 2px 6px; border-radius: 4px;',
    );
  }

  ngOnDestroy(): void {
    this.truckControl.disconnect();
    console.log(
      '%c📡 Connection closed',
      'background: #6b7280; color: white; padding: 2px 6px; border-radius: 4px;',
    );
  }
}
