import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class TranslatorService {

    private defaultLanguage: string = 'en';

    private availablelangs = [
        { name: 'en', displayName: "English", icon: "famfamfam-flags us" },
        { name: 'hu', displayName: "Magyar", icon: "famfamfam-flags hu" }
    ];

    constructor(private translocoService: TranslocoService) {
        if (!translocoService.getDefaultLang())
            translocoService.setDefaultLang(this.defaultLanguage);

        translocoService.selectTranslate('Logout')
            .subscribe(() => { });

    }

    useLanguage(lang: string | null = null) {
        this.translocoService.setActiveLang(lang || this.defaultLanguage);

        this.translocoService.selectTranslate('Logout')
            .subscribe(() => { });
    }

    getAvailableLanguages(): { name: string, displayName: string, icon: string }[] {
        return this.availablelangs;
    }

    getCurrentLanguage(): { name: string, displayName: string, icon: string } {
        let currentLanguageName = this.translocoService.getDefaultLang() || this.defaultLanguage;

        return this.availablelangs.filter(i => i.name == currentLanguageName)[0];
    }
}
