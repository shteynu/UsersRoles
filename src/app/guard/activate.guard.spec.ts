import { TestBed } from '@angular/core/testing';

import { ActivateGuard } from './activate.guard';
import {modules} from "../models/module-util";

describe('ActivateGuard', () => {
  let guard: ActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...modules
      ],
    });
    guard = TestBed.inject(ActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
