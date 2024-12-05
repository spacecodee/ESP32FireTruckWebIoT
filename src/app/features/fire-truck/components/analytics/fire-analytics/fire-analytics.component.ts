import { Component, OnInit } from '@angular/core';
import { FireAnalyticsService } from '@features/fire-truck/services/fire-analytics.service';
import { AsyncPipe, DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-fire-analytics',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgForOf],
  templateUrl: './fire-analytics.component.html',
  styleUrl: './fire-analytics.component.scss',
})
export class FireAnalyticsComponent implements OnInit {
  analytics$ = this.fireAnalytics.analytics$;

  constructor(private readonly fireAnalytics: FireAnalyticsService) {}

  ngOnInit(): void {
    this.fireAnalytics.initializeAnalytics();
  }
}
