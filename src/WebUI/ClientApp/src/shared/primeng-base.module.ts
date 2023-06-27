import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    imports: [
        CardModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        TableModule,
        PaginatorModule,
        TooltipModule,
        DividerModule,
        CheckboxModule,
        CalendarModule,
        InputTextareaModule,
        InputNumberModule 
    ],
    exports: [
        CardModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        TableModule,
        PaginatorModule,
        TooltipModule,
        DividerModule,
        CheckboxModule,
        CalendarModule,
        InputTextareaModule,
        InputNumberModule 
    ]
})
export class PrimengBaseModule { }