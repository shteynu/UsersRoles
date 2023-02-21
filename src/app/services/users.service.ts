import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {SnackMessageService} from './snack-message.service';
import {DataExchangeServiceService} from './data-exchange-service.service';
import {Profile, RequestData, ResponseData} from '../models/auth-data';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: ApiService,
    private snackMessage: SnackMessageService,
    private dataExchangeService: DataExchangeServiceService
  ) {}

  public getAllUsers(): Observable<ResponseData> {

    const httpData: RequestData = {
      url: 'profiles',
      params: { role_lte: 'user' },
    };
    return this.apiService.get(httpData).pipe(
      catchError(error => {
        this.snackMessage.show({
          message: error?.message || 'Failure during list users profile',
        });
        return throwError(() => new Error(error));
      })
    );
  }

  public updateUser(
    user: Profile
  ): Promise<{ success: boolean; user: Profile }> {
    const httpData: RequestData = {
      url: `profiles/${user.id}`,
      body: user,
    };
    return null;
  }


  public deleteUser(userID: number): Observable<{ data: any; success: boolean; error: null }> {
    const httpData: RequestData = {
      url: `profiles/${userID}`,
    };
    return this.apiService.delete(httpData);
  }

}
