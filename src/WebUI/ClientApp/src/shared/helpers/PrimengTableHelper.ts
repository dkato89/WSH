import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

export class PrimengTableHelper {
    predefinedRecordsCountPerPage = [1, 5, 10, 25, 50, 100, 250, 500];

    defaultRecordsCountPerPage = 10;

    isResponsive = true;

    resizableColumns:boolean = false;

    totalRecordsCount = 0;

    records?: any[];

    isLoading = false;

    defaultSortField: string | null = null;
    defaultSortOrder: number = 1;

    showLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = true;
        }, 0);
    }

    hideLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 0);
    }

    getSorting(table: Table | undefined | null): string | undefined {
        let sorting = '';
        if (table == null) {
            return sorting;
        }
        if (table.sortMode === 'multiple') {
            if (table.multiSortMeta) {
                for (let i = 0; i < table.multiSortMeta.length; i++) {
                    const element = table.multiSortMeta[i];
                    if (i > 0) {
                        sorting += ',';
                    }
                    sorting += element.field;
                    if (element.order === 1) {
                        sorting += ' ASC';
                    } else if (element.order === -1) {
                        sorting += ' DESC';
                    }
                }
            }
        } else {
            if (table.sortField) {
                sorting = table.sortField;
                if (table.sortOrder === 1) {
                    sorting += ' ASC';
                } else if (table.sortOrder === -1) {
                    sorting += ' DESC';
                }
            }

            return sorting;
        }

        return sorting;
    }

    getMaxResultCount(paginator: Paginator | null | undefined, event: LazyLoadEvent | null | undefined): number {
        if (paginator == null) { return this.defaultRecordsCountPerPage; }
        if (paginator.rows) {
            return paginator.rows;
        }

        if (!event) {
            return 0;
        }

        return event.rows!;
    }

    getSkipCount(paginator: Paginator | null | undefined, event: LazyLoadEvent | null | undefined): number {
        if (paginator == null) { return 0; }

        if (paginator.first) {
            return paginator.first;
        }

        if (!event) {
            return 0;
        }

        return event.first!;
    }

    shouldResetPaging(event: LazyLoadEvent | null | undefined): boolean {
        if (!event) {
            return true;
        }

        return false;
    }

    adjustScroll(table: Table) {
        const body: HTMLElement = table.el.nativeElement.querySelector('.p-datatable-scrollable-body');
        const header: HTMLElement = table.el.nativeElement.querySelector('.p-datatable-scrollable-header');
        body.addEventListener('scroll', () => {
            header.scrollLeft = body.scrollLeft;
        });
    }
}
