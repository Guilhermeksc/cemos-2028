import { Routes } from '@angular/router';

import { defaultHomeRedirect, moduleRoutes } from './routes/module-route.config';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      { path: '', redirectTo: defaultHomeRedirect, pathMatch: 'full' },
      ...moduleRoutes
    ]
  },
  { path: '**', redirectTo: 'login' }
];
