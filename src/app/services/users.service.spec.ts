import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {modules} from "../models/module-util";

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...modules
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
