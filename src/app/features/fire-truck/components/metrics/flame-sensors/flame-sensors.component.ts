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
    sensor1: 0,
    sensor2: 0,
    sensor3: 0,
  };
  private subscription?: Subscription;

  constructor(
    private flameSensor: FlameSensorService,
    private audioService: AudioService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.flameSensor.sensorValues$.subscribe((values) => {
      this.sensorValues = values;
      if (Object.values(values).some((value) => value < 50)) {
        this.audioService.playAlert();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getColorClass(value: number): string {
    if (value > 80) return 'text-red-500';
    if (value > 50) return 'text-orange-500';
    return 'text-green-500';
  }
}
