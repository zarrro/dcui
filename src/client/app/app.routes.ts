import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { AnamnesisRoutes } from './anamnesis/index';
import { AuthRoutes } from './auth/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...AnamnesisRoutes,
  ...AuthRoutes
];
