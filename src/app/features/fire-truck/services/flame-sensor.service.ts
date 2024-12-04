import { Injectable } from '@angular/core';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FlameSensorStatus } from '../types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class FlameSensorService {
  private readonly sensorValues = new BehaviorSubject<{
    sensor1: number;
    sensor2: number;
    sensor3: number;
  }>({
    sensor1: 100, // Changed from 0 to 100 (no fire detected)
    sensor2: 100,
    sensor3: 100,
  });
  sensorValues$ = this.sensorValues.asObservable();

  constructor(private readonly webSocketService: WebSocketService) {
    this.webSocketService.messages$
      .pipe(
        filter(
          (message): message is FlameSensorStatus =>
            message !== null &&
            'type' in message &&
            message.type === 'flame_sensors',
        ),
      )
      .subscribe((status) => {
        this.sensorValues.next({
          sensor1: status.sensor1,
          sensor2: status.sensor2,
          sensor3: status.sensor3,
        });
      });
  }
}
