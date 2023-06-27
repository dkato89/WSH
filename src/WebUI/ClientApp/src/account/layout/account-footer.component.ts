import { Component, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DateTime } from 'luxon';
import { AppComponentBase } from 'src/shared/app-component-base';

@Component({
  selector: 'account-footer',
  templateUrl: './account-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFooterComponent extends AppComponentBase {
  currentYear: number;
  versionText: string;

  constructor(injector: Injector) {
    super(injector);

    this.currentYear = new Date().getFullYear();
    
    this.versionText =
      `1.0.0 [${DateTime.now().toFormat('yyyyLLdd')}]`;
  }
}
