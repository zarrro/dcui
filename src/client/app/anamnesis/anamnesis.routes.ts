import { Route } from '@angular/router';
import { AnamnesisFormComponent } from './index';
import { PaymentComponent } from './index';
import { ResultComponent } from './index';

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
