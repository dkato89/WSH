import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    LayoutModule,
    MainRoutingModule
  ]
})
export class MainModule { }
