import { Component, Injector } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponentBase } from 'src/shared/app-component-base';
import { TokenService } from 'src/shared/auth/token.service';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html'
})
export class HeaderUserMenuComponent extends AppComponentBase {
  items: MenuItem[];

  constructor(injector: Injector,
    private _tokenService: TokenService) {
    super(injector);

    var me = this;
    this.items = [
      {
        label: this.l("Logout"), icon: 'pi pi-sign-out', command: (event) => {
          me.logout();
        }
      }
    ];
  }

  logout(): void {
    this._tokenService.removeToken();

    location.reload();
  }
}
