import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlameSensorsComponent } from '@features/fire-truck/components/metrics/flame-sensors/flame-sensors.component';

@Component({
  selector: 'app-sensor-panel',
  standalone: true,
  imports: [CommonModule, FlameSensorsComponent],
  templateUrl: './sensor-panel.component.html',
})
export class SensorPanelComponent {}
