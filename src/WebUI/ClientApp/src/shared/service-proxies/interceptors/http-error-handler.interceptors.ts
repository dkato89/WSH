import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppHttpErrorResponse } from '../service-proxies';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private messageService: MessageService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var me = this;

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    let appError: AppHttpErrorResponse | null = null;
                    if (error && error.error)
                        appError = error.error as AppHttpErrorResponse;

                    if (appError && me.isValidationError(error, appError)) {
                        return throwError({ validationErrors: appError.details });
                    }
                    else if (appError && appError.skipErrorHandler == true) {
                        return throwError(appError);
                    }
                    else if (error.status == 400) {
                        return throwError(appError);
                    }
                    else if (error.status == 401) {
                        me.router.navigate(['/account/login']);
                    }
                    else {
                        if (error.status == 404 || error.status == 400) {
                            me.router.navigate(['/404']);
                        } else {
                            me.router.navigate(['/500']);
                        }
                    }
                } else {
                    me.router.navigate(['/500']);
                }

                return EMPTY;
            })
        );
    }

    displayErrorMessage(errorResponse: HttpErrorResponse) {
        let message = "Http error (" + errorResponse.status + "). " + ((errorResponse.error && errorResponse.error["Error"]) ? errorResponse.error["Error"] : "Unknown error");

        this.messageService.clear();
        this.messageService.add({ key: 'rootToast', severity: 'error', summary: "Server error", detail: message });
    }

    isValidationError(httpError: HttpErrorResponse, error: AppHttpErrorResponse | null): boolean | null {
        return httpError && httpError.status == 400 && error && error.error == "VALIDATIONERROR"
    }
}