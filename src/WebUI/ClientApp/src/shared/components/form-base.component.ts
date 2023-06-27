import { Component, Injector, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../app-component-base';

@Component({ template: '' })
export abstract class FormBaseComponent<TRecord> extends AppComponentBase {
    record: TRecord;
    @ViewChild('form', { static: false }) form?: NgForm;
    saving: boolean = false;

    constructor(
        injector: Injector,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        super(injector);

        this.record = this.createRecord();
    }

    protected abstract createRecord(): TRecord;

    save(): void {
        var me = this;

        me.form!.form.markAllAsTouched();

        if (me.form!.form.invalid) {
            return;
        }

        me.saving = true;

        me.saveAction()
            .pipe(finalize(() => me.saving = false))
            .subscribe((result) => {
                me.close(result);
            });
    }

    protected abstract saveAction(): Observable<any>;

    close(result?: any): void {
        this.ref.close(result);
    }

    isFormCtrlInvalid(formCtrl: FormControl): boolean {
        return (formCtrl.invalid && (formCtrl.dirty || formCtrl.touched))
    }
}