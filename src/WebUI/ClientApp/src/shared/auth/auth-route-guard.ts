// Manually modified by trafia team
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AppSessionService } from '../session/app-session.service';

@Injectable()
export class AppRouteGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _sessionService: AppSessionService,
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivateInternal(route.data, state);
    }


    canActivateInternal(data: any, state: RouterStateSnapshot): Observable<boolean> {

        if (!this._sessionService.user) {
            this._router.navigate(['/account/login']);
        }

        if (!data || !(data['permission'])) {
            return of(true);
        }

        let result = true;
        // if (data['permission'] && !this._permissionChecker.isGranted(data['permission'])) {
        //     result = false;
        // }

        if(result)
            return of(true);

        this._router.navigate(['/account/login']);
        return of(false);
    }

}
