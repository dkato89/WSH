import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppSessionService } from './session/app-session.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './validations/validation-messages.component';
import { TranslatorService } from './translate/translator.service';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { TokenService } from './auth/token.service';
import { SubheaderModule } from './sub-header/subheader.module';
import { PageMessageService } from './helpers/page-message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsModule } from './utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        DynamicDialogModule,
        TranslocoRootModule,
        SubheaderModule,
        UtilsModule
    ],
    declarations: [
        ValidationMessagesComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule, 
        DynamicDialogModule,
        TranslocoRootModule,
        SubheaderModule,
        UtilsModule,

        ValidationMessagesComponent
    ],
    providers: [PageMessageService, DialogService]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppRouteGuard,
                MessageService,
                DialogService,
                TranslatorService,
                TokenService,
                PageMessageService
            ]
        };
    }
}
