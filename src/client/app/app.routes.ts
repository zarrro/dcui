import { Routes } from '@angular/router';

import { HomeRoutes } from './home/index';
import { AnamnesisRoutes } from './anamnesis/index';
import { AuthRoutes } from './auth/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AnamnesisRoutes,
  ...AuthRoutes
];
