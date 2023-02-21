import { TestBed } from '@angular/core/testing';

import { SnackMessageService } from './snack-message.service';
import {modules} from "../models/module-util";

describe('SnackMessageService', () => {
  let service: SnackMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...modules
      ],
    });
    service = TestBed.inject(SnackMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
