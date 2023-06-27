import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {
    private localStorageKey: string = "userToken";

    public isAuthenticated(): boolean {
        return this.getToken() != null;
    }

    public setToken(token: string) {
        localStorage.setItem(this.localStorageKey, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.localStorageKey);
    }

    public removeToken() {
        localStorage.removeItem(this.localStorageKey);
    }

}