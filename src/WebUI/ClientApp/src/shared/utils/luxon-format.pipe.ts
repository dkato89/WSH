import { Injector, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({ name: 'luxonFormat' })
export class LuxonFormatPipe implements PipeTransform {
    locale: string;

    constructor(
        injector: Injector
    ) {
        this.locale = injector.get(LOCALE_ID);
    }

    transform(value: DateTime, format: string) {
        if (!value) {
            return '';
        }

        return value.setLocale(this.locale).toFormat(format);
    }
}
