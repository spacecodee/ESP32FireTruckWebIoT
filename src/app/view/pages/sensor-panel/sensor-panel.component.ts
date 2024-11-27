import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlameSensorsComponent } from '@features/fire-truck/components/metrics/flame-sensors/flame-sensors.component';

@Component({
  selector: 'app-sensor-panel',
  standalone: true,
  imports: [CommonModule, FlameSensorsComponent],
  templateUrl: './sensor-panel.component.html',
})
export class SensorPanelComponent {
  lastUpdate = new Date();
  allSensorsOk = true;
  totalSensors = 3;
  averageReading = 0;
  trendingUp = false;
  activeAlerts = 0;

  getColorClass(value: number): string {
    if (value > 80) return 'text-red-500';
    if (value > 50) return 'text-orange-500';
    return 'text-green-500';
  }
}
