import { Route } from '@angular/router';
import { LoginFormComponent } from './index';

export const AuthRoutes: Route[] = [
  {
    path: 'login',
    component: LoginFormComponent
  }
];
