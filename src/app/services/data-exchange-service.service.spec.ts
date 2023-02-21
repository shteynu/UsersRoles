import { TestBed } from '@angular/core/testing';

import { DataExchangeServiceService } from './data-exchange-service.service';

describe('DataExchangeServiceService', () => {
  let service: DataExchangeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExchangeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
