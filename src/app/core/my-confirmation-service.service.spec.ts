import { TestBed } from '@angular/core/testing';

import { MyConfirmationServiceService } from './my-confirmation-service.service';

describe('MyConfirmationServiceService', () => {
  let service: MyConfirmationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyConfirmationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
