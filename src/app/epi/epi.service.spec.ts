import { TestBed } from '@angular/core/testing';

import { EpiService } from './epi.service';

describe('EpiService', () => {
  let service: EpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
