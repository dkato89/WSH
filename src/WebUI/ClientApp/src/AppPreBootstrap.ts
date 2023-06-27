import { environment } from "./environments/environment";
import { AppConsts } from "./shared/AppConsts";
import { XmlHttpRequestHelper } from "./shared/helpers/XmlHttpRequestHelper";

export class AppPreBootstrap {
    static run(appRootUrl: string, callback: () => void, resolve: any, reject: any): void {
        AppPreBootstrap.getApplicationConfig(appRootUrl, () => {
            callback();
            console.log("AppPreBootstrap.run ended...");
        });
    }

    private static getApplicationConfig(appRootUrl: string, callback: () => void) {
        let type = 'GET';
        let url = appRootUrl + 'assets/' + environment.appConfig;

        XmlHttpRequestHelper.ajax(type, url, [], null, (result: { appBaseUrl: string; remoteServiceBaseUrl: string; }) => {
            AppConsts.appBaseUrl = result.appBaseUrl
            AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;

            callback();
        });
    }
}
