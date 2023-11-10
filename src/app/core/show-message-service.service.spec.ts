import { TestBed } from '@angular/core/testing';

import { ShowMessageServiceService } from './show-message-service.service';

describe('ShowMessageServiceService', () => {
  let service: ShowMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
