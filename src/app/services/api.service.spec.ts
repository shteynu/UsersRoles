import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {modules} from '../models/module-util';
import {of} from 'rxjs';
import {RequestData, ResponseData} from '../models/auth-data';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: any;
  let snackSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...modules
      ],
    });
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    },
    service = new ApiService(httpClientSpy, snackSpy);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get with response', async () => {
    const reqData = {} as RequestData;
    const resData = {} as ResponseData;
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(resData));

    await service.get(reqData).subscribe(
      {
        next: data => {
          expect(data).toEqual(resData);
        }
      }
    );
  });
});
