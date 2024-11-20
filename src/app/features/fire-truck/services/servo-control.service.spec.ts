import { TestBed } from '@angular/core/testing';

import { ServoControlService } from './servo-control.service';

describe('ServoControlService', () => {
  let service: ServoControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServoControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
