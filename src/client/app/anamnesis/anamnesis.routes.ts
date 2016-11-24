import { Route } from '@angular/router';
import { AnamnesisFormComponent } from './index';
import { PaymentComponent } from './index';
import { ResultComponent } from './index';
import { LoggedInGuard } from '../auth/logged-in-guard';

export const AnamnesisRoutes: Route[] = [
  {
    path: 'anamnesisForm',
    component: AnamnesisFormComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'result/:uuid',
    component: ResultComponent,
    canActivate: [LoggedInGuard]
  }
];
