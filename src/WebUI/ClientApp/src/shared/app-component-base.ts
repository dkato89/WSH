import { Injector } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";
import { PageMessageService } from "./helpers/page-message.service";
import { DialogService } from "primeng/dynamicdialog";

export abstract class AppComponentBase {
    messageService: PageMessageService;
    translateService: TranslocoService;
    dialogService: DialogService;

    constructor(injector: Injector) {
        this.messageService = injector.get(PageMessageService);
        this.translateService = injector.get(TranslocoService);
        this.dialogService = injector.get(DialogService);
    }

    isNullOrUndefined(value: any): boolean {
        return value == null || value == undefined;
    }

    isNullOrUndefinedOrEmpty(value: string | null | undefined): boolean {
        return this.isNullOrUndefined(value) || value == "";
    }

    l(key: string, ...args: any[]): string {
        return this.translateService.translate(key, args);
    }

    // message(severity: string, summary: string, detail?: string): void {
    //     this.messageService.add({ key: 'rootToast', severity: severity, summary: summary, detail: detail });
    // }

    // successMsg(summary: string, detail?: string): void {
    //     this.message("success", summary, detail);
    // }
}
