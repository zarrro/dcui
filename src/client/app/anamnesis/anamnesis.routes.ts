import { Route } from '@angular/router';
import { AnamnesisFormComponent } from './index';
import { PaymentComponent } from './index';
import { ResultComponent } from './index';
import { LoggedInGuard } from '../auth/logged-in-guard';

export const AnamnesisRoutes: Route[] = [
  {
    path: 'anamnesisForm',
    component: AnamnesisFormComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'result/:uuid',
    component: ResultComponent
  }
];
