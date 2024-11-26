import { Injectable } from '@angular/core';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FlameSensorStatus } from '../types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class FlameSensorService {
  private sensorValues = new BehaviorSubject<{
    sensor1: number;
    sensor2: number;
    sensor3: number;
  }>({
    sensor1: 0,
    sensor2: 0,
    sensor3: 0,
  });
  sensorValues$ = this.sensorValues.asObservable();

  constructor(private ws: WebSocketService) {
    this.ws.messages$
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