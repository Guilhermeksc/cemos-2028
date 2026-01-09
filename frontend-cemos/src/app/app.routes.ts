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
        loadComponent: () => import('./pages/home/home-landing/estatistica-user/estatistica-user').then((m) => m.EstatisticaUser)
      },
      {
        path: 'bibliografia-id',
        loadComponent: () => import('./pages/home/home-landing/bibliografia-id/bibliografia-id').then((m) => m.BibliografiaId)
      },
      {
        path: 'cronograma',
        loadComponent: () => import('./pages/home/home-landing/cronograma/cronograma').then((m) => m.Cronograma)
      },
      {
        path: 'revisar-questoes',
        loadComponent: () => import('./components/perguntas/revisar-questoes/revisar-questoes').then((m) => m.RevisarQuestoes),
        canActivate: [authGuard]
      },
      ...moduleRoutes
    ]
  },
  { path: '**', redirectTo: 'login' }
];
