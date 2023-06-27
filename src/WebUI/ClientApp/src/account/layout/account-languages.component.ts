import {
  Component,
  OnInit,
  Injector,
  ChangeDetectionStrategy
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AppComponentBase } from 'src/shared/app-component-base';

@Component({
  selector: 'account-languages',
  templateUrl: './account-languages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountLanguagesComponent extends AppComponentBase implements OnInit {
  languages: { name: string; displayName: string; icon: string; }[] | undefined;
  currentLanguage: string | undefined;

  constructor(injector: Injector,
    private translocoService: TranslocoService) {
    super(injector);
  }

  ngOnInit() {   
    this.languages = [
      { name: 'hu', displayName: "Magyar", icon: "famfamfam-flags hu" },
      { name: 'en', displayName: "English", icon: "famfamfam-flags us" },
    ];
    this.currentLanguage = this.translocoService.getActiveLang();
  }

  changeLanguage(languageName: string): void {
    this.translocoService.setActiveLang(languageName);
  }
}
