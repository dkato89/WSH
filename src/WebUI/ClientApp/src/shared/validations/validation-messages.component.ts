import { Component, Injector, Input } from '@angular/core';
import { filter as _filter, find as _find, concat as _concat } from 'lodash-es';
import { AppComponentBase } from '../app-component-base';
import { FormControl } from '@angular/forms';

class ErrorDef {
    error!: string;
    localizationKey!: string;
    errorProperty!: string;
}

@Component({
    selector: '<validation-messages>',
    template: `
        <div style="color: #B00020" *ngIf="formCtrl?.invalid == true && (formCtrl?.dirty == true || formCtrl?.touched == true || submitted === true)">
            <div *ngFor="let errorDef of errorDefsInternal">
                <div *ngIf="getErrorDefinitionIsInValid(errorDef)">
                    {{ getErrorDefinitionMessage(errorDef) }}
                </div>
            </div>
        </div>
    `,
})
export class ValidationMessagesComponent extends AppComponentBase {
    _errorDefs: ErrorDef[] = [];

    @Input() formCtrl: FormControl<any> | undefined;

    @Input() set errorDefs(value: ErrorDef[]) {
        this._errorDefs = value;
    }

    @Input() submitted: boolean = false;


    readonly standartErrorDefs: ErrorDef[] = [
        { error: 'required', localizationKey: 'ThisFieldIsRequired' } as ErrorDef,
        {
            error: 'minlength',
            localizationKey: 'PleaseEnterAtLeastNCharacter',
            errorProperty: 'requiredLength',
        } as ErrorDef,
        {
            error: 'maxlength',
            localizationKey: 'PleaseEnterNoMoreThanNCharacter',
            errorProperty: 'requiredLength',
        } as ErrorDef,
        { error: 'email', localizationKey: 'InvalidEmailAddress' } as ErrorDef,
        { error: 'pattern', localizationKey: 'InvalidPattern', errorProperty: 'requiredPattern' } as ErrorDef,
        { error: 'dateLessThanNow', localizationKey: 'Validation.DateLessThanNow' } as ErrorDef,
        { error: 'dateGreaterThanOrEqualNow', localizationKey: 'Validation.DateGreaterThanOrEqualNow' } as ErrorDef,
        { error: 'positiveNumber', localizationKey: 'Validation.PositiveNumber' } as ErrorDef,
        { error: 'percentage', localizationKey: 'Validation.Percentage' } as ErrorDef,
        { error: 'greaterThanOrEqual', localizationKey: 'Validation.GreaterThanOrEqual', errorProperty: 'value' } as ErrorDef,
        { error: 'greaterThan', localizationKey: 'Validation.GreaterThan', errorProperty: 'value' } as ErrorDef,
        { error: 'lessThanOrEqual', localizationKey: 'Validation.LessThanOrEqual', errorProperty: 'value' } as ErrorDef,
        { error: 'validateEqual', localizationKey: 'PasswordsDoNotMatch', errorProperty: 'value' } as ErrorDef,
        { error: 'validatePassword', localizationKey: 'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber' } as ErrorDef
        
    ];

    get errorDefsInternal(): ErrorDef[] {
        let standarts = _filter(
            this.standartErrorDefs,
            (ed) => !_find(this._errorDefs, (edC) => edC.error === ed.error)
        );
        let all = <ErrorDef[]>_concat(standarts, this._errorDefs);

        return all;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    getErrorDefinitionIsInValid(errorDef: ErrorDef): boolean {
        return !!this.formCtrl?.errors![errorDef.error];
    }

    getErrorDefinitionMessage(errorDef: ErrorDef): string {
        let errorRequirement = this.formCtrl?.errors![errorDef.error][errorDef.errorProperty];
        return !!errorRequirement
            ? this.l(errorDef.localizationKey, errorRequirement)
            : this.l(errorDef.localizationKey);
    }
}
