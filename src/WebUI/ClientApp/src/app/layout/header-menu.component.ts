import { Component, Injector, OnInit } from '@angular/core';

import {
    NavigationEnd,
    PRIMARY_OUTLET,
    Router, RouterEvent
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppComponentBase } from 'src/shared/app-component-base';
import { MenuItem } from 'src/shared/layout/menu-item';
import { MenuService } from 'src/shared/layout/menu-service';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.less'],
    providers: [MenuService]
})
export class HeaderMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[] | undefined;
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    homeRoute = '/';
    routerEvents: BehaviorSubject<RouterEvent> | undefined;

    constructor(injector: Injector, private router: Router, private _menuService: MenuService) {
        super(injector);

        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);

        const events =
            this.router.events.pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                map((event: NavigationEnd) => event.url))
                .subscribe((url) => {
                    const currentUrl = url !== '/' ? url : this.homeRoute;
                    const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                        .children[PRIMARY_OUTLET];
                    if (primaryUrlSegmentGroup) {
                        this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                    }
                });
    }

    ngOnInit(): void {
    }

    getMenuItems(): MenuItem[] {
        return this._menuService.getMenuItems();
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems!);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems!);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        return true;
    }
}
