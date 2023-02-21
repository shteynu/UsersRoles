import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {RequestData, ResponseData} from '../models/auth-data';
import {SnackMessageService} from "./snack-message.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private snackMessage: SnackMessageService) {}

  public get(httpData: RequestData): Observable<ResponseData> {
    const httpOptions = this.generateHttpOptions(httpData.params, httpData.headers);
    return this.http.get(`${this.apiUrl}/${httpData.url}`, httpOptions)
        .pipe(
          map((res) => {
            return { success: true, data: res, error: null };
          }),
          catchError(error => {
            this.snackMessage.show({
              message: error?.message || 'Failure during get profile',
            });
            return throwError(() => new Error(error));
          })
        );
  }

  public post(httpData: RequestData) {
    const httpOptions = this.generateHttpOptions(httpData.params, httpData.headers);
    return this.http
        .post(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(
          map((res) => {
            return { success: true, data: res, error: null };
          }),
          catchError(error => {
            this.snackMessage.show({
              message: error?.errors || 'Failure during login',
            });
            return throwError(() => new Error(error));
          })
        );

  }

  public put(httpData: RequestData) {
    const httpOptions = this.generateHttpOptions(httpData.params, httpData.headers);
    return this.http
        .put(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(
          map((res) => {
            return { success: true, data: res, error: null };
          }),
          catchError(error => {
            return throwError(() => new Error(error));
          })
        );
  }

  delete(httpData: RequestData ) {
      return this.http
        .delete(`${this.apiUrl}/${httpData.url}`, httpData.body)
        .pipe(
          map((res) => {
            return { success: true, data: res, error: null };
          }),
          catchError(error => {
            return throwError(() => new Error(error));
          })
        );
  }

  private generateHttpOptions = (params: any, headers: any) => {
    const httpOptions: any = {};
    if (params) {
      let httpParams = new HttpParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const paramValue = params[key];
          httpParams = httpParams.append(key, paramValue);
        }
      }
      httpOptions.params = httpParams;
    }
    if (headers) {
      let httpHeaders = new HttpHeaders();
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const headerValue = headers[key];
          httpHeaders = httpHeaders.append(key, headerValue);
        }
      }
      httpOptions.headers = httpHeaders;
    }
    return httpOptions;
  }
}

