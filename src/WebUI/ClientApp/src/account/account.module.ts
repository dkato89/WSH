import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountFooterComponent } from './layout/account-footer.component';
import { AccountHeaderComponent } from './layout/account-header.component';
import { SharedModule } from 'src/shared/shared.module';
import { AccountLanguagesComponent } from './layout/account-languages.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountFooterComponent,
        AccountHeaderComponent,
        AccountComponent,
        AccountLanguagesComponent
    ],
})
export class AccountModule {}
