import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/shared/home/home').then((m) => m.Home),
  },
  {
    path: 'quote/start',
    loadComponent: () =>
      import('./modules/quote-flow/quote-start/quote-start').then((m) => m.QuoteStartComponent),
  },
  {
    path: 'quote/personal',
    loadComponent: () =>
      import('./modules/quote-flow/personal-info/personal-info').then(
        (m) => m.PersonalInfoComponent
      ),
  },
  {
    path: 'quote/coverage',
    loadComponent: () =>
      import('./modules/quote-flow/coverage-details/coverage-details').then(
        (m) => m.CoverageDetailsComponent
      ),
  },
  {
    path: 'quote/summary',
    loadComponent: () =>
      import('./modules/quote-flow/quote-summary/quote-summary').then(
        (m) => m.QuoteSummaryComponent
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./modules/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./modules/auth/register/register').then((m) => m.Register),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
