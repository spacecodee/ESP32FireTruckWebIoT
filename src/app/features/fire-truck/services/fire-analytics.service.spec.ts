import { TestBed } from '@angular/core/testing';

import { FireAnalyticsService } from './fire-analytics.service';

describe('FireAnalyticsService', () => {
  let service: FireAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
