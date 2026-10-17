import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./Components/login/login').then((m) => m.Login),
    title: 'Login',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
