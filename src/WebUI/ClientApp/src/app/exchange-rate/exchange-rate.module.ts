import { NgModule } from '@angular/core';
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { ExchangeRateComponent } from './exchange-rate.component';

@NgModule({
  declarations: [
    ExchangeRateComponent
  ],
  imports: [
    ExchangeRateRoutingModule
  ]
})
export class ExchangeRateModule { }
