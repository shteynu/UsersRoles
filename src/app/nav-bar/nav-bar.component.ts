import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Profile} from "../models/auth-data";
import {Observable} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {

  currentUser!: Observable<Profile>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.userProfile();
  }
  logOut() {
    this.authService.logOut();
  }
}
