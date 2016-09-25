import { Route } from '@angular/router';
import { AnamnesisFormComponent } from './index';
import { LoggedInGuard } from '../auth/logged-in-guard';

export const AnamnesisRoutes: Route[] = [
  {
    path: 'anamnesisForm',
    component: AnamnesisFormComponent,
    canActivate: [LoggedInGuard]
  }
];
