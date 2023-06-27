import { Component, Injector, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, catchError, finalize } from 'rxjs';
import { forEach as _forEach, map as _map, filter as _filter } from 'lodash-es';
import { FormBaseComponent } from 'src/shared/components/form-base.component';
import { ChangeCurrencyRateRequest, ChangeCurrencyRateResult, ExchangeRateServiceProxy } from 'src/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './change-currency-rate.component.html'
})
export class ChangeCurrencyComponent extends FormBaseComponent<ChangeCurrencyRateRequest> implements OnInit {
    currencyList?: string[];

    result: ChangeCurrencyRateResult | undefined = undefined;

    constructor(
        injector: Injector,
        public override ref: DynamicDialogRef,
        public override config: DynamicDialogConfig,
        private _service: ExchangeRateServiceProxy
    ) {
        super(injector, ref, config);
    }

    ngOnInit(): void {
        this.loadCurrencies()
            .then(() => {
                this.record.targetCurrency = "EUR";
            });
    }

    protected createRecord(): ChangeCurrencyRateRequest {
        let record = new ChangeCurrencyRateRequest();

        return record;
    }

    override save(): void {
        var me = this;

        me.form!.form.markAllAsTouched();

        if (me.form!.form.invalid) {
            return;
        }

        me.saving = true;

        me._service.changeCurrencyRateFromHUF(this.record)
            .pipe(finalize(() => me.saving = false))
            .subscribe((result: ChangeCurrencyRateResult) => {
                me.result = result;
            });
    }

    private loadCurrencies(): Promise<string[] | undefined> {
        return new Promise<string[] | undefined>((resolve, reject) => {
            this._service.listCurrencies()
                .pipe(catchError(err => {
                    reject(err);
                    throw new Error(err);
                }))
                .subscribe((result) => {
                    this.currencyList = result.items?.filter(i => i != "HUF");

                    resolve(result.items);
                })
        });
    }

    protected override saveAction(): Observable<any> {
        throw new Error('Method not implemented.');
    }
}