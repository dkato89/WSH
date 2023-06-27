import { Component, Injector } from '@angular/core';
import { DateTime } from 'luxon';
import { AppComponentBase } from 'src/shared/app-component-base';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent extends AppComponentBase {
  currentYear: number;
  versionText: string;

  constructor(injector: Injector) {
    super(injector);

    this.currentYear = new Date().getFullYear();
    
    this.versionText =
      `1.0.0 [${DateTime.now().toFormat('yyyyLLdd')}]`;
  }
}
