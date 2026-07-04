import { Routes } from '@angular/router';
import { captchaGuard } from './core/guards/captcha.guard';
import { resultGuard } from './core/guards/result.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
    title: 'Angul-It — CAPTCHA Challenge',
  },
  {
    path: 'captcha',
    loadComponent: () => import('./features/captcha/captcha').then((m) => m.CaptchaComponent),
    canActivate: [captchaGuard],
    title: 'Angul-It — Solve the Challenge',
  },

  {
    path: 'result',
    loadComponent: () => import('./features/result/result').then((m) => m.ResultComponent),
    canActivate: [resultGuard],
    title: 'Angul-It — Your Results',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
