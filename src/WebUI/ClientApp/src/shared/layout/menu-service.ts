import { Injectable, Injector } from '@angular/core';
import { MenuItem } from './menu-item';
import { AppComponentBase } from '../app-component-base';

@Injectable()
export class MenuService extends AppComponentBase {

  constructor(injector: Injector) {
    super(injector);
  }

  public getMenuItems(): MenuItem[] {
    return [
      new MenuItem('ExchangeRate', '/main/exchange-rate', 'pi pi-dollar'),
  ];
  }
}
