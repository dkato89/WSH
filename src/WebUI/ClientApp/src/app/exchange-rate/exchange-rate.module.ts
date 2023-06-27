import { NgModule } from '@angular/core';
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { SharedModule } from 'src/shared/shared.module';
import { PrimengBaseModule } from 'src/shared/primeng-base.module';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChangeCurrencyComponent } from './change-currency-rate.component';

@NgModule({
  declarations: [
    ExchangeRateComponent,
    ChangeCurrencyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimengBaseModule,
    ExchangeRateRoutingModule,
    MultiSelectModule 
  ],
  providers: [
    ExchangeRateServiceProxy
  ]
})
export class ExchangeRateModule { }
