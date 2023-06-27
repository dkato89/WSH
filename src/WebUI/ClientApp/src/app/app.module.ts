import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { API_BASE_URL, IdentityServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { AppConsts } from 'src/shared/AppConsts';
import { PlatformLocation } from '@angular/common';
import { AppPreBootstrap } from 'src/AppPreBootstrap';
import { AppSessionService } from 'src/shared/session/app-session.service';
import { PagesModule } from './pages/pages.module';
import { MessageService } from 'primeng/api';
import { HttpErrorHandlerInterceptor } from 'src/shared/service-proxies/interceptors/http-error-handler.interceptors';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/shared/shared.module';
import { TranslocoRootModule } from './transloco-root.module';
import { TokenService } from 'src/shared/auth/token.service';
import { HttpHeaderInterceptor } from 'src/shared/service-proxies/interceptors/httpheader.interceptors';
import { TranslatorService } from 'src/shared/translate/translator.service';

export function appInitializerFactory(translateService: TranslatorService, injector: Injector) {
  return () => {
    return new Promise<boolean>((resolve, reject) => {
      AppConsts.appBaseHref = '/';
      let appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;

      AppPreBootstrap.run(
        appBaseUrl,
        () => {
          let sessionService = injector.get(AppSessionService);
          sessionService.init().then(
            (result) => {
              resolve(true);
            },
            (err) => {
              reject(err);
            }
          );
        },
        resolve,
        reject
      );
    });
  };
}

export function getBaseHref(platformLocation: PlatformLocation): string {
  let baseUrl = platformLocation.getBaseHrefFromDOM();
  if (baseUrl) {
    return baseUrl;
  }

  return '/';
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

function getDocumentOrigin() {
  if (!document.location.origin) {
    return (
      document.location.protocol +
      '//' +
      document.location.hostname +
      (document.location.port ? ':' + document.location.port : '')
    );
  }

  return document.location.origin;
}

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule,
    ToastModule,
    SharedModule,
    TranslocoRootModule
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    IdentityServiceProxy,
    AppSessionService,
    TokenService,
    MessageService,
    TranslatorService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [PlatformLocation, Injector],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translateService: TranslatorService) {}
}
