import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { accountModuleAnimation } from 'src/shared/animations/router-transition';
import { AppComponentBase } from 'src/shared/app-component-base';
import { IdentityServiceProxy, RegisterUserRequest, RegisterUserResult } from 'src/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase {
    model: RegisterUserRequest = new RegisterUserRequest();
    saving = false;

    constructor(
        injector: Injector,
        private _identityService: IdentityServiceProxy,
        private _router: Router
    ) {
        super(injector);
    }

    save(): void {
        this.saving = true;
        this._identityService
            .registerUser(this.model)
            .pipe(
                finalize(() => {
                    this.saving = false;
                }),
                catchError(err => {
                    console.log(err);
                    return of(err);
                })
            )
            .subscribe((result: RegisterUserResult) => {
                this.messageService.success(this.l('SuccessfullyRegistered'))
                this._router.navigate(['/account/login']);
            });
    }

    isFormCtrlInvalid(formCtrl: FormControl<any>): boolean {
        return (formCtrl.invalid && (formCtrl.dirty || formCtrl.touched))
      }
}
