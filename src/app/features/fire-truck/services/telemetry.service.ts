import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  getWaterLevel(): Observable<number> {
    // Implementation
    return new Observable();
  }

  getBatteryStatus(): Observable<number> {
    // Implementation
    return new Observable();
  }
}
