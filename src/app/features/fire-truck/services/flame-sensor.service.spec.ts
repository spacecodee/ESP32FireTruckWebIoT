import { TestBed } from '@angular/core/testing';

import { FlameSensorService } from './flame-sensor.service';

describe('FlameSensorService', () => {
  let service: FlameSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlameSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
