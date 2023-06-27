import { NgModule } from '@angular/core';

import { LuxonFormatPipe } from './luxon-format.pipe';

@NgModule({
    declarations: [LuxonFormatPipe],
    imports: [
    ],
    exports: [
        LuxonFormatPipe
    ]
    
})
export class UtilsModule { }