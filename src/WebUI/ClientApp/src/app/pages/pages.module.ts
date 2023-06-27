import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Error500Component } from './error500.component';
import { Error404Component } from './error404.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        Error404Component,
        Error500Component
    ],
    exports: [
        Error404Component,
        Error500Component,
    ]
})
export class PagesModule { }
