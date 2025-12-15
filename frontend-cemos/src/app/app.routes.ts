import { Routes } from '@angular/router';

import { moduleRoutes } from './routes/module-route.config';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      { 
        path: '', 
        loadComponent: () => import('./pages/home/home-landing/home-landing.component').then((m) => m.HomeLandingComponent)
      },
      {
        path: 'estatisticas',
        loadComponent: () => import('./components/perguntas/estatisticas/estatisticas').then((m) => m.EstatisticasComponent)
      },
      ...moduleRoutes
    ]
  },
  { path: '**', redirectTo: 'login' }
];
