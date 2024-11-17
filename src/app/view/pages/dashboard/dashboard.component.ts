// view/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementPadComponent } from '../../../features/fire-truck/components/controls/movement-pad/movement-pad.component';
import { ConnectionStatusComponent } from '../../../features/fire-truck/components/status/connection-status/connection-status.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MovementPadComponent, ConnectionStatusComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
