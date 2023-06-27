import {
  Component,
  OnInit,
  Injector
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponentBase } from 'src/shared/app-component-base';
import { TranslatorService } from 'src/shared/translate/translator.service';

@Component({
  selector: 'header-language-menu',
  templateUrl: './header-language-menu.component.html',
  providers: [TranslatorService]
})
export class HeaderLanguageMenuComponent extends AppComponentBase implements OnInit {
  languages: { name: string; displayName: string; icon: string; }[] | undefined;
  currentLanguage: { name: string; displayName: string; icon: string; } | undefined;
  items: MenuItem[] | undefined;

  constructor(injector: Injector, private _translateService: TranslatorService) {
    super(injector);
  }

  ngOnInit() {
    var me = this;

    me.languages = this._translateService.getAvailableLanguages();

    me.items = me.languages.map((lang) => {
      return {
        label: lang.displayName, icon: lang.icon, command: (event) => {
          me.changeLanguage(lang.name)
        }
      };
    });

    me.currentLanguage = me._translateService.getCurrentLanguage();
  }

  changeLanguage(languageName: string): void {
    this._translateService.useLanguage(languageName);

    this.currentLanguage = this.languages?.filter(i=> i.name == languageName)[0];
  }
}
