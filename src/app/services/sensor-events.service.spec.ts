import { TestBed } from '@angular/core/testing';

import { SensorEventsService } from './sensor-events.service';

describe('SensorEventsService', () => {
  let service: SensorEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
