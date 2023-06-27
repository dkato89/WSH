import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { FooterComponent } from './footer.component';
import { HeaderLanguageMenuComponent } from './header-language-menu.component';
import { HeaderUserMenuComponent } from './header-user-menu.component';
import { HeaderComponent } from './header.component';
import { SidebarLogoComponent } from './sidebar-logo.component';
import { HeaderMenuComponent } from './header-menu.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MenuModule,
        ButtonModule,
        RippleModule,
        SharedModule,
        TooltipModule
    ],
    declarations: [
        HeaderComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarLogoComponent,
        HeaderMenuComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        HeaderMenuComponent
    ]
})
export class LayoutModule { }