import { TestBed } from '@angular/core/testing';

import { LedControlService } from './led-control.service';

describe('LedControlService', () => {
  let service: LedControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
