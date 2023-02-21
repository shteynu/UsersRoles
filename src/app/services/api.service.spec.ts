import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {modules} from "../models/module-util";

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...modules
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
