import { Component, Injector, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, catchError, map } from 'rxjs';
import { IListResult } from 'src/shared/components/ilistresult';
import { ListBaseComponent } from 'src/shared/components/listbase.component';
import { ExchangeRate, ExchangeRateDay, ExchangeRateListQuery, ExchangeRateServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { forEach as _forEach } from 'lodash-es';
import { ExchangeRateTableRow } from './exchange-rate-table-row';
import { ChangeCurrencyComponent } from './change-currency-rate.component';

@Component({
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent extends ListBaseComponent<ExchangeRateDay> implements OnInit {
  currencyList?: string[];
  selectedCurrencies?: string[];
  rangeDates: Date[] | undefined;

  ngOnInit(): void {
    let now = DateTime.now();
    let from = DateTime.now().minus({ days: 7 });

    this.rangeDates = [new Date(from.year, from.month - 1, from.day), new Date(now.year, now.month - 1, now.day)];
    this.loadCurrencies()
      .then(() => {
        this.selectedCurrencies = ["EUR", "USD"];

        this.getRecords();
      })
  }

  constructor(
    injector: Injector,
    private _service: ExchangeRateServiceProxy
  ) {
    super(injector)
  }

  override loadRecords(): Observable<IListResult<ExchangeRateDay>> {
    let query = new ExchangeRateListQuery();
    query.from = DateTime.fromJSDate(this.rangeDates![0]);
    query.to = DateTime.fromJSDate(this.rangeDates![1]);
    query.currencies = this.selectedCurrencies;

    return this._service.list(query).pipe(map(i => <IListResult<ExchangeRateDay>>i));
  }

  override setRecords(items: ExchangeRateDay[]) {
    let _items: ExchangeRateTableRow[] = [];
    _forEach(items, function (day: ExchangeRateDay) {
      _forEach(day.rates, function (rate: ExchangeRate) {
        let i = new ExchangeRateTableRow();
        i.date = day.date;
        i.currency = rate.currency;
        i.rateValue = rate.rateValue;
        i.unit = rate.unit;

        _items.push(i);
      });
    });
    this.primengTableHelper.records = _items;
  }

  private loadCurrencies(): Promise<string[] | undefined> {
    return new Promise<string[] | undefined>((resolve, reject) => {
      this._service.listCurrencies()
        .pipe(catchError(err => {
          reject(err);
          throw new Error(err);
        }))
        .subscribe((result) => {
          this.currencyList = result.items;

          resolve(result.items);
        })
    });
  }

  changeFromHUF(): void {
    var me = this;
    const ref = this.dialogService.open(ChangeCurrencyComponent, {
        header: this.l("ChangeCurrencyRateFromHUF"),
        styleClass: 'p-dialog-lg'
    });

    ref.onClose.subscribe((item) => {
        me.getRecords();
    });
  }

  onRangeDatesSelect(): void {
    if (!this.rangeDates || this.rangeDates.length != 2)
      return;

    this.getRecords();
  }
}