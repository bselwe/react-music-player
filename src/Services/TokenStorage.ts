import { AsyncStorage } from "react-native";

export class TokenStorage {
    constructor(
        private tokenKey: string = "token",
        private refreshKey = "refresh_token",
        private expiryKey = "expiration_date") {
    }

    public getToken(): Promise<string | null> {
        return AsyncStorage.getItem(this.tokenKey);
    }

    public async setToken(val: string | null) {
        await this.setOrClearVar(this.tokenKey, val);
    }

    public getRefreshToken(): Promise<string | null> {
        return AsyncStorage.getItem(this.refreshKey);
    }

    public async setRefreshToken(val: string | null) {
        await this.setOrClearVar(this.refreshKey, val);
    }

    public async getExpirationDate(): Promise<Date | null> {
        let exp = await AsyncStorage.getItem(this.expiryKey);
        return exp ? new Date(exp) : null;
    }

    public async setExpirationDate(val: Date | null) {
        let exp = val ? val.getTime().toString() : null;
        await this.setOrClearVar(this.expiryKey, exp);
    }

    private async setOrClearVar(key: string, val: string | null) {
        if (val) {
            await AsyncStorage.setItem(key, val);
        }
        else {
            await AsyncStorage.removeItem(key);
        }
    }
}

export const tokenStorage = new TokenStorage();
