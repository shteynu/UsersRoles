import { Component } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Profile} from '../models/auth-data';
import {DataExchangeServiceService} from '../services/data-exchange-service.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  readonly userRoles: string[] = environment.userRoles;
  currentUser$: Observable<Profile | null> =
    this.dataExchangeService.currentUser$.asObservable();
  constructor(
    private dataExchangeService: DataExchangeServiceService,
    private authService: AuthService
  ) {}
}
