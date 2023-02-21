import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {UsersListComponent} from './users-list/users-list.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {UserPageComponent} from './user-page/user-page.component';
import {AuthInterceptor} from './interceptors/AuthInterceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, UsersListComponent, UserPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
