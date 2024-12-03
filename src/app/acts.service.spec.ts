import { TestBed } from '@angular/core/testing';

import { ACTSService } from './acts.service';

describe('ACTSService', () => {
  let service: ACTSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ACTSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
