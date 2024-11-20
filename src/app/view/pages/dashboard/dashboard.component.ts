// view/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementPadComponent } from '@app/features/fire-truck/components/controls/movement-pad/movement-pad.component';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';
import { TruckStatusComponent } from '@app/features/fire-truck/components/status/truck-status/truck-status.component';
import { LedControlComponent } from '@app/features/fire-truck/components/controls/led-control/led-control.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MovementPadComponent,
    ThemeToggleComponent,
    TruckStatusComponent,
    LedControlComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
