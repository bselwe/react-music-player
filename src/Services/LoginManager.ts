import { tokenStorage, TokenStorage } from "./TokenStorage";
import encode from "form-urlencoded";
import cfg from "../Configuration/Config";

const Client = "music_player_user";
const Scopes = "api/music_player_user offline_access openid profile email";

export class CannotRefreshToken extends Error { }

export class LoginManager {
    constructor(
        private storage: TokenStorage,
        private endpoint: string,
        private secret: string,
        private client: string,
        private scopes: string) {
    }

    public signOut() {
        this.storage.setToken(null);
        this.storage.setRefreshToken(null);
        this.storage.setExpirationDate(null);
    }

    public async isSigned() {
        return (await this.storage.getToken()) !== null;
    }

    public async getToken() {
        if (!(await this.storage.getToken())) {
            throw new Error("Not signed in");
        }
        let expDate = await this.storage.getExpirationDate();
        if (expDate && expDate < new Date()) {
            if (!await this.tryRefreshToken()) {
                throw new CannotRefreshToken("Cannot refresh access token after it has expired");
            }
        }
        return await this.storage.getToken;
    }

    public trySignIn(username: string, password: string): Promise<boolean> {
        return this.acquireToken(this.buildSignInRequest(username, password));
    }

    //TODO: implement
    public trySignUp(username: string, password: string): any {
        return null;
    }

    public async tryRefreshToken(): Promise<boolean> {
        return this.acquireToken(await this.buildRefreshRequest());
    }

    // public onChange(callback: () => void) {
    //     this.callbacks.push(callback);
    // }

    // public removeOnChange(callback: () => void) {
    //     let idx = this.callbacks.indexOf(callback);
    //     if (idx !== -1) {
    //         this.callbacks.splice(idx, 1);
    //     }
    // }

    private async acquireToken(init: RequestInit) {
        try {
            let result = await fetch(this.endpoint + "/connect/token", init);
            if (!result.ok) {
                if (result.status === 400) {
                    console.warn("Cannot sign user in, invalid username or password/refresh token, user will need to sign-in again");
                    this.signOut();
                } else {
                    console.error("Auth server returned an unknown error: %d %s", result.status, result.statusText);
                }
                return false;
            }

            let tokenResult = await result.json();

            await this.storage.setToken(tokenResult.access_token);
            await this.storage.setRefreshToken(tokenResult.refresh_token);

            let expDate = new Date();
            expDate.setSeconds(new Date().getSeconds() + tokenResult.expires_in);
            await this.storage.setExpirationDate(expDate);

            return true;
        } catch (e) {
            console.warn("Cannot call Auth server ", e);
            return false;
        }
    }

    public buildSignInRequest(username: string, password: string): RequestInit {
        let data = {
            "grant_type": "password",
            "scope": this.scopes,
            "username": username,
            "password": password
        };
        let params = encode(data);
        return {
            method: "POST",
            headers: this.prepareHeaders(),
            body: params
        };
    }

    private async buildRefreshRequest(): Promise<RequestInit> {
        let params = encode({
            "grant_type": "refresh_token",
            "scope": this.scopes,
            "refresh_token": await this.storage.getRefreshToken() || ""
        });

        return {
            method: "POST",
            headers: this.prepareHeaders(),
            body: params
        };
    }

    private prepareHeaders() {
        let headers = new Headers();
        let sec = btoa(this.client + ":" + this.secret);
        headers.append("Authorization", "Basic " + sec);
        return headers;
    }
}

export const loginManager = new LoginManager(tokenStorage, cfg.apiEndpoint, cfg.authSecret, Client, Scopes);
