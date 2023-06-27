import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { accountModuleAnimation } from 'src/shared/animations/router-transition';
import { AppComponentBase } from 'src/shared/app-component-base';
import { TokenService } from 'src/shared/auth/token.service';
import { IdentityServiceProxy, LoginRequest, TokenResult } from 'src/shared/service-proxies/service-proxies';
import { AppSessionService } from 'src/shared/session/app-session.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;

  loginModel: LoginRequest = new LoginRequest();

  constructor(
    injector: Injector,
    private router: Router,
    private _identityService: IdentityServiceProxy,
    private _tokenService: TokenService,
    private _sessionService: AppSessionService
  ) {
    super(injector);
  }

  login(): void {
    this.submitting = true;

    this._identityService.login(this.loginModel)
      .pipe(
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe((result: TokenResult) => {
        if (!result || this.isNullOrUndefinedOrEmpty(result.token)) {
          this.router.navigate(['/500']);
        } else {
          this._tokenService.setToken(result.token!);

          this._sessionService.init()
            .then(() => {
              this.router.navigate(['/']);
            });
        }
      });
  }

  isFormCtrlInvalid(formCtrl: FormControl<any>): boolean {
    return (formCtrl.invalid && (formCtrl.dirty || formCtrl.touched))
  }
}
