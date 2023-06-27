import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: '/main/exchange-rate', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'exchange-rate',
        loadChildren: () => import('../exchange-rate/exchange-rate.module').then((m) => m.ExchangeRateModule)
      }
    ]
  },
  { path: '**', redirectTo: '/main/exchange-rate' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }