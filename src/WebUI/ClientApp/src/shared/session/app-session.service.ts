import { Injectable } from "@angular/core";
import { UserLoginInfo, ApplicationInfo, IdentityServiceProxy, CurrentLoginInformations } from "../service-proxies/service-proxies";

@Injectable()
export class AppSessionService {
    private _user: UserLoginInfo | undefined;
    private _application: ApplicationInfo | undefined;

    constructor(
        private _service: IdentityServiceProxy,
    ) { }

    get application(): ApplicationInfo | undefined {
        return this._application;
    }

    set application(val: ApplicationInfo) {
        this._application = val;
    }

    get user(): UserLoginInfo | undefined {
        return this._user;
    }

    get userId(): string | null {
        return this.user ? this.user.userId : null;
    }

    init(): Promise<CurrentLoginInformations | undefined> {
        return new Promise<CurrentLoginInformations | undefined>((resolve, reject) => {
            this._service
                .getCurrentLoginInformations()
                .toPromise()
                .then(
                    (result: CurrentLoginInformations | undefined) => {
                        if (result) {
                            this._application = result.application;
                            this._user = result.user;
                        }

                        resolve(result);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }
}