import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '../helpers/PrimengTableHelper';
import { AppComponentBase } from '../app-component-base';
import { IListResult } from './ilistresult';

@Component({ template: '' })
export class ListBaseComponent<TItem> extends AppComponentBase {
    @ViewChild('dataTable', { static: false }) dataTable?: Table;
    @ViewChild('paginator', { static: false }) paginator?: Paginator;

    advancedFiltersAreShown = false;
    filterText: string | undefined = '';
    loading: boolean = false;

    public get SkipCount(): number { return this.primengTableHelper.getSkipCount(this.paginator, null); }
    public get MaxResultCount(): number { return this.primengTableHelper.getMaxResultCount(this.paginator, null); }
    public get Sorting(): string | undefined { return this.primengTableHelper.getSorting(this.dataTable); }

    primengTableHelper: PrimengTableHelper;

    get items(): TItem[] | undefined { return this.primengTableHelper.records; }

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.primengTableHelper = new PrimengTableHelper();

        let _activatedRoute = injector.get(ActivatedRoute);
        this.filterText = _activatedRoute.snapshot.queryParams['filterText'] || '';
    }

    getRecords(event?: LazyLoadEvent): void {
        var me = this;

        if (this.paginator && this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();


        this.loadRecords()
            .pipe(finalize(() => {
                this.primengTableHelper.hideLoadingIndicator();
            }))
            .subscribe((result: IListResult<TItem>) => {

                me.setRecords(result.items);
                

                this.messageService.success(this.l("DataLoaded"));
            });
    }

    setRecords(items: TItem[]) {
        this.primengTableHelper.records = items;
    }

    loadRecords(): Observable<IListResult<TItem>> {
        throw 'NotImplemented';
    }

    clearFilters(): void {
        this.filterText = undefined;
    }
}