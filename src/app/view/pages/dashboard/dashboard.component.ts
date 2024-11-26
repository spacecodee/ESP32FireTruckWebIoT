// view/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementPadComponent } from '@app/features/fire-truck/components/controls/movement-pad/movement-pad.component';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';
import { TruckStatusComponent } from '@app/features/fire-truck/components/status/truck-status/truck-status.component';
import { LedControlComponent } from '@app/features/fire-truck/components/controls/led-control/led-control.component';
import { ServoControlComponent } from '@features/fire-truck/components/controls/servo-control/servo-control.component';
import { FlameSensorsComponent } from '@features/fire-truck/components/metrics/flame-sensors/flame-sensors.component';
import { AudioControlComponent } from '../../../features/fire-truck/components/controls/audio-control/audio-control.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MovementPadComponent,
    ThemeToggleComponent,
    TruckStatusComponent,
    LedControlComponent,
    ServoControlComponent,
    FlameSensorsComponent,
    AudioControlComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
