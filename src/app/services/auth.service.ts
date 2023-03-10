import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import {HttpRequestData, LoginData, Profile, RequestData} from '../models/auth-data';
import {DataExchangeServiceService} from './data-exchange-service.service';
import {ApiService} from './api.service';
import {SnackMessageService} from './snack-message.service';
import {concatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private snackMessage: SnackMessageService,
    private dataExchangeService: DataExchangeServiceService
  ) {}


  login(formData: LoginData) {
    const httpData: HttpRequestData = { url: 'login', body: formData };
    this.apiService.post(httpData).pipe(
      map((res) => {
        console.log(res);
        if (res.success && res.data['accessToken']) {
          this.setCookies(res.data['accessToken'], formData?.email);
        }
      }),
      concatMap(res => {
        return this.userProfile();
      })
    ).subscribe(res => {
      const id = res?.id;
      this.router.navigate(['pages/user', id]).then();
    });
  }

  userProfile(): Observable<Profile> {
    const userMail = this.cookieService.get('email');
    console.log(userMail);
    const httpData: RequestData = { url: 'profiles', params: { email: userMail } };
    return this.apiService.get(httpData).pipe(
      map(res => {
        console.log(res);
        if (res.success && res.data?.length > 0) {
          const userInfo: Profile = res?.data[0];
          this.dataExchangeService.currentUser$.next(userInfo);
          return userInfo;
        } else {
          return {} as Profile;
        }
      })
    );
  }

  logOut() {
    this.cookieService.deleteAll();
    this.dataExchangeService.currentUser$.next(null);
    this.router.navigate(['/login']);
  }


  private setCookies(oAuthToken: string, email: string) {
    const expires = this.expireTime10min();
    this.cookieService.set('authToken', oAuthToken, {
      path: '/',
      expires,
    });
    this.cookieService.set('email', email, { path: '/', expires });
  }

  private expireTime10min = () => {
    const dNow = new Date();
    let dTime = dNow.getTime();
    dTime += 1000 * 600;
    dNow.setTime(dTime);
    return dNow;
  }
}
