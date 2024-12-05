import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FlameSensorsComponent } from '@features/fire-truck/components/metrics/flame-sensors/flame-sensors.component';
import { FireAnalyticsComponent } from '@features/fire-truck/components/analytics/fire-analytics/fire-analytics.component';
import { FlameSensorService } from '@features/fire-truck/services/flame-sensor.service';

@Component({
  selector: 'app-sensor-panel',
  standalone: true,
  imports: [CommonModule, FlameSensorsComponent, FireAnalyticsComponent],
  templateUrl: './sensor-panel.component.html',
})
export class SensorPanelComponent implements OnInit, OnDestroy {
  lastUpdate = new Date();
  allSensorsOk = true;
  totalSensors = 3;
  averageReading = 0;
  trendingUp = false;
  activeAlerts = 0;
  private lastAverageReading = 0;
  private subscription = new Subscription();

  constructor(private readonly flameSensor: FlameSensorService) {}

  ngOnInit(): void {
    this.subscription = this.flameSensor.sensorValues$.subscribe((values) => {
      // Update last update timestamp
      this.lastUpdate = new Date();

      // Calculate average
      const readings = Object.values(values);
      this.averageReading = Math.round(
        readings.reduce((sum, value) => sum + value, 0) / this.totalSensors,
      );

      // Check if trending up (more dangerous) or down (safer)
      this.trendingUp = this.averageReading > this.lastAverageReading;
      this.lastAverageReading = this.averageReading;

      // Count active alerts (values <= 30 indicate fire)
      this.activeAlerts = readings.filter((value) => value <= 30).length;

      // Update overall status
      this.allSensorsOk = this.activeAlerts === 0;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getColorClass(value: number): string {
    if (value <= 30) return 'text-red-500';
    if (value <= 60) return 'text-orange-500';
    if (value <= 80) return 'text-yellow-500';
    return 'text-green-500';
  }
}
