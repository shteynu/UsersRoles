import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {SnackMessageService} from './snack-message.service';
import {DataExchangeServiceService} from './data-exchange-service.service';
import {Profile, RequestData, ResponseData} from '../models/auth-data';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
    const currentUser: Profile | null =
      this.dataExchangeService.currentUser$.getValue();

    const httpData: RequestData = {
      url: 'profiles',
      params: { role_lte: currentUser?.role },
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
   /* const { success, error, data } = await this.apiService.put(httpData);
    if (success) {
      return { success: true, user: data };
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during update',
      });
      return { success: false, user: data };
    }*/
    return null;
  }


  public deleteUser(
    userID: number
  ): Promise<{ success: boolean; user: Profile }> {
    const httpData: RequestData = {
      url: `profiles/${userID}`,
    };
    /*const { success, error, data } = await this.apiService.delete(httpData);
    if (success) {
      return { success: true, user: data };
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during update',
      });
      return { success: false, user: data };
    }*/
    return null;
  }

}
