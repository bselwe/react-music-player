declare module "tidal-api-wrapper" {
    export interface TidalOptions {
        readonly countryCode?: string;
        readonly limit?: number;
    }

    export interface LoginResult {
        readonly userId: number;
        readonly sessionId: string;
        readonly countryCode: string;
    }

    export interface Artist {
        readonly id: number;
        readonly name: string;
        readonly url: string;
        readonly picture: string;
        readonly popularity: number;
    }

    export default class Tidal {
        constructor(options: TidalOptions);
        login(username: string, password: string): LoginResult;
        search(query: string, type: "artists", limit?: number): Promise<Artist[]>;
        search(query: string, type: "albums", limit?: number): Promise<any[]>;
        search(query: string, type: "tracks", limit?: number): Promise<any[]>;
        search(query: string, type: "playlists", limit?: number): Promise<any[]>;
    }
}