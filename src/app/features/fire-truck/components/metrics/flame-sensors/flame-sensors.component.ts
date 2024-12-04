import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlameSensorService } from '@features/fire-truck/services/flame-sensor.service';
import { Subscription } from 'rxjs';
import { AudioService } from '@app/core/services/audio.service';
import { WebSocketService } from '@app/core/services/websocket/websocket.service';

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
  private previousAlert = false;
  private readonly subscription = new Subscription();

  constructor(
    private readonly flameSensor: FlameSensorService,
    private readonly audioService: AudioService,
    private readonly webSocketService: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.webSocketService.connectionStatus$.subscribe((connected) => {
        if (!connected) {
          this.sensorValues = {
            sensor1: 100,
            sensor2: 100,
            sensor3: 100,
          };
          this.previousAlert = false;
        }
      }),
    );

    this.subscription.add(
      this.flameSensor.sensorValues$.subscribe((values) => {
        this.sensorValues = values;

        const isFireDetected = Object.values(values).some(
          (value) => value <= 30,
        );
        if (isFireDetected && !this.previousAlert) {
          this.audioService.playAlert();
          this.previousAlert = true;
        } else if (!isFireDetected) {
          this.previousAlert = false;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getColorClass(value: number): string {
    if (value <= 30) return 'text-red-500 stroke-red-500';
    if (value <= 60) return 'text-orange-500 stroke-orange-500';
    if (value <= 80) return 'text-yellow-500 stroke-yellow-500';
    return 'text-green-500 stroke-green-500';
  }
}
