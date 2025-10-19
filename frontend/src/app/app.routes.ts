import { Routes } from '@angular/router';

import { moduleRoutes } from './routes/module-route.config';

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
      { 
        path: '', 
        loadComponent: () => import('./pages/home/home-landing/home-landing.component').then((m) => m.HomeLandingComponent)
      },
      ...moduleRoutes
    ]
  },
  { path: '**', redirectTo: 'login' }
];
