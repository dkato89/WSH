import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { TokenService } from 'src/shared/auth/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    constructor(private _tokenService: TokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this._tokenService.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._tokenService.getToken()}`
                }
            });
        }

        request = request.clone({
            setHeaders: {
                'Content-Type': `application/json`
            }
        });

        return next.handle(request);
    }
}