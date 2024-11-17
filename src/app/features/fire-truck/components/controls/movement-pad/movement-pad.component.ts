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
  }

  onDirectionEnd(): void {
    this.activeDirection = 'stop';
    this.truckControl.move('stop');
  }

  togglePump(): void {
    this.isPumpActive = !this.isPumpActive;
    this.truckControl.setPump(this.isPumpActive);
  }

  ngOnDestroy(): void {
    this.truckControl.disconnect();
  }
}
