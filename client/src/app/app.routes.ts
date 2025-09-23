import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/quote/start',
    pathMatch: 'full',
  },
  {
    path: 'quote/start',
    loadComponent: () =>
      import('./modules/quote-flow/quote-start/quote-start').then((m) => m.QuoteStartComponent),
  },
];
