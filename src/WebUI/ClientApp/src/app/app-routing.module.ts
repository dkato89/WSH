import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404.component';
import { Error500Component } from './pages/error500.component';

const routes: Routes = [
  { path: '', redirectTo: '/main/exchange-rate', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () => import('../account/account.module').then((m) => m.AccountModule),
    data: { preload: true },
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    data: { preload: true },
  },

  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },


  { path: '**', redirectTo: '/main/exchange-rate' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
