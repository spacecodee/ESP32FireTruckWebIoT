import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Direction } from '@app/features/fire-truck/types/truck.types';
import { TruckControlService } from '@app/features/fire-truck/services/truck-control.service';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movement-pad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movement-pad.component.html',
})
export class MovementPadComponent implements OnInit, OnDestroy {
  activeDirection: Direction = 'stop';
  isPumpActive = false;
  private subscription?: Subscription;

  constructor(
    private readonly truckControl: TruckControlService,
    private readonly webSocketService: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.truckControl.pumpState$.subscribe(
      (state) => (this.isPumpActive = state),
    );
  }

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
    const newState = !this.isPumpActive;
    this.isPumpActive = newState; // Immediately update UI
    this.truckControl.setPump(newState);
    console.log(
      newState ? '%c💦 Pumping' : '%c🚱 Stopped',
      'background: #10b981; color: white; padding: 2px 6px; border-radius: 4px;',
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.webSocketService.disconnect();
    console.log(
      '%c📡 Connection closed',
      'background: #6b7280; color: white; padding: 2px 6px; border-radius: 4px;',
    );
  }
}
