import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlameSensorService } from '@features/fire-truck/services/flame-sensor.service';
import { Subscription } from 'rxjs';
import { AudioService } from '@app/core/services/audio.service';

@Component({
  selector: 'app-flame-sensors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flame-sensors.component.html',
  styleUrl: './flame-sensors.component.scss',
})
export class FlameSensorsComponent implements OnInit, OnDestroy {
  sensorValues = {
    sensor1: 100,
    sensor2: 100,
    sensor3: 100,
  };
  private subscription?: Subscription;
  private previousAlert = false;

  constructor(
    private readonly flameSensor: FlameSensorService,
    private readonly audioService: AudioService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.flameSensor.sensorValues$.subscribe((values) => {
      this.sensorValues = values;

      // Only alert if any sensor is detecting fire and we haven't alerted yet
      const isFireDetected = Object.values(values).some((value) => value <= 30);
      if (isFireDetected && !this.previousAlert) {
        this.audioService.playAlert();
        this.previousAlert = true;
      } else if (!isFireDetected) {
        this.previousAlert = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getColorClass(value: number): string {
    if (value <= 30) return 'text-red-500 stroke-red-500';
    if (value <= 60) return 'text-orange-500 stroke-orange-500';
    if (value <= 80) return 'text-yellow-500 stroke-yellow-500';
    return 'text-green-500 stroke-green-500';
  }
}
