import { Component, Injector, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from 'src/shared/app-component-base';

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AccountComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, private renderer: Renderer2) {
        super(injector);
    }

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'login-page');
      }
}
