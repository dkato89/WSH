import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/exchange-rate', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () => import('../account/account.module').then((m) => m.AccountModule),
    data: { preload: true },
  },
  {
    path: 'exchange-rate',
    loadChildren: () => import('./exchange-rate/exchange-rate.module').then((m) => m.ExchangeRateModule),
    data: { preload: true },
  },
  { path: '**', redirectTo: '/exchange-rate' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
