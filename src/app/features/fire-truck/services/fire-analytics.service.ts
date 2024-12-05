import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FireAnalytics } from '../types/truck.types';

@Injectable({
  providedIn: 'root',
})
export class FireAnalyticsService {
  // Initial mock data
  private readonly initialData: FireAnalytics = {
    day: 3,
    week: 12,
    month: 25,
    lastDetection: new Date('2024-03-20T14:30:00'),
    // Add historical data
    history: [
      { date: '2024-03-20T14:30:00', sensor: 1, value: 25 },
      { date: '2024-03-20T12:15:00', sensor: 2, value: 28 },
      { date: '2024-03-20T10:45:00', sensor: 3, value: 22 },
    ],
  };

  private readonly analytics = new BehaviorSubject<FireAnalytics>(
    this.initialData,
  );
  analytics$ = this.analytics.asObservable();

  recordFireDetection(sensorNumber: number, value: number): void {
    const current = this.analytics.value;
    const now = new Date();

    // Update counts
    current.day++;
    current.week++;
    current.month++;
    current.lastDetection = now;

    // Add to history
    current.history = [
      { date: now.toISOString(), sensor: sensorNumber, value },
      ...current.history,
    ].slice(0, 10); // Keep last 10 detections

    this.analytics.next(current);

    // Store in localStorage for persistence
    localStorage.setItem('fireAnalytics', JSON.stringify(current));
  }

  // Reset counters at specific intervals
  resetDaily(): void {
    const current = this.analytics.value;
    current.day = 0;
    this.analytics.next(current);
    localStorage.setItem('fireAnalytics', JSON.stringify(current));
  }

  resetWeekly(): void {
    const current = this.analytics.value;
    current.week = 0;
    this.analytics.next(current);
    localStorage.setItem('fireAnalytics', JSON.stringify(current));
  }

  resetMonthly(): void {
    const current = this.analytics.value;
    current.month = 0;
    this.analytics.next(current);
    localStorage.setItem('fireAnalytics', JSON.stringify(current));
  }

  // Initialize analytics from localStorage if available
  initializeAnalytics(): void {
    const stored = localStorage.getItem('fireAnalytics');
    if (stored) {
      this.analytics.next(JSON.parse(stored));
    }
  }
}
