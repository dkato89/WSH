import { Injectable, Injector } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";
import { MessageService } from "primeng/api";

@Injectable()
export class PageMessageService {
    private message: MessageService;
    private key: string = "rootToast";

    private localization: TranslocoService;

    constructor(injector: Injector) {
        this.message = injector.get(MessageService);
        this.localization = injector.get(TranslocoService);
    }

    warn(message: string): void {
        this.message.add({ key: this.key, severity: 'warn', summary: this.l("Warning"), detail: message });
    }

    success(message: string): void {
        this.message.add({ key: this.key, severity: 'success', summary: this.l("Success"), detail: message });
    }

    private l(key: string, ...args: any[]): string {
        return this.localization.translate(key, args);
    }
}