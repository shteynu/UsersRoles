import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserPageComponent} from './user-page/user-page.component';
import {UsersListComponent} from './users-list/users-list.component';
import {ActivateGuard} from './guard/activate.guard';
import {PagesComponent} from './pages/pages.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'pages', component: PagesComponent, children: [
      {
        path: 'user',
        component: UserPageComponent,
        canActivate: [ActivateGuard]
      },
      {
        path: 'list',
        component: UsersListComponent,
        canActivate: [ActivateGuard]
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
