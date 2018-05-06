import axios, { AxiosInstance } from "axios";
import qs from "querystring";

class Tidal {
    private url: string;
    private webToken: string;
    private countryCode: string;
    private limit: number;
    private api: AxiosInstance;
    private params: string;
    private localeParams: string;

    private username: string;
    private password: string;
    private userId: string;
    private sessionId: string;

    constructor(options: TidalOptions) {
        this.url = 'https://api.tidalhifi.com/v1';
        // this.webToken = 'wdgaB1CilGA-S_s2';
        this.webToken = 'kgsOOmYk3zShYrNP';
        this.countryCode = options.countryCode || 'US';
        this.limit = options.limit || 1000;
        this.username = options.username;
        this.password = options.password;
        this.api = axios.create({
            baseURL: this.url,
            headers: {
                'x-tidal-token': this.webToken,
            },
        });

        // some base params for GET requests
        this.params = `limit=${this.limit}&countryCode=${this.countryCode}`;
        // params for Tidal pages that require a locale and device type
        this.localeParams = `locale=en_${this.countryCode}&deviceType=BROWSER&countryCode=${this.countryCode}`;
    }

    async login(): Promise<LoginResult> {
        if (!this.username || !this.password) {
            throw new Error('Username and password are required arguments of login()');
        }

        const params = qs.stringify({
            username: this.username,
            password: this.password,
            clientUniqueKey: this.webToken
        });

        const res = await this.api({
            method: 'POST',
            url: `/login/username?token=${this.webToken}`,
            data: params,
        });

        // store this info for use in other methods
        this.userId = res.data.userId;
        this.sessionId = res.data.sessionId;
        this.params = `${this.params}&sessionId=${res.data.sessionId}`;

        return res.data;
    }

    async search(query: string, type: "artists", limit?: number) : Promise<Artist[]>
    async search(query: string, type: "albums", limit?: number): Promise<Album[]>
    async search(query: string, type: "tracks", limit?: number): Promise<Track[]>
    async search(query: string, type: "playlists", limit?: number): Promise<Playlist[]>
    async search(query: string, type: "artists" | "albums" | "tracks" | "playlists", limit: number = 25): Promise<Artist[] | Album[] | Track[] | Playlist[]> {
        const accTypes = ['artists', 'albums', 'tracks', 'playlists'];

        if (!type) {
            throw new Error('Search requires type as a second argument (artists, albums, tracks, or playlists)');
        }

        if (accTypes.indexOf(type) < 0) {
            throw new Error(`${type} is not a valid search type('artists', 'albums', 'tracks', 'playlists' are valid).`);
        }

        const res = await this.api({
            method: 'GET',
            url: `/search/${type}?query=${query}&limit=${limit}&countryCode=${this.countryCode}`,
        });

        return res.data.items;
    }

    async getTrack(id: number): Promise<Track> {
        const res = await this.api({
            method: 'GET',
            url: `/tracks/${id}?${this.params}`,
        });

        return res.data;
    }

    async getTrackStreamUrl(id: number): Promise<TrackStream> {
        if (!this.userId || !this.sessionId) {
            await this.login();
            return this.getTrackStreamUrl(id);
        }
        
        const res = await this.api({
            method: 'GET',
            url: `/tracks/${id}/streamUrl?soundQuality=HIGH&${this.params}`,
        });
        
        return res.data;
    }

    async getFavoriteTracks(): Promise<Track[]> {
        if (!this.userId || !this.sessionId) {
            await this.login();
            return this.getFavoriteTracks();
        }

        const res = await this.api({
            method: 'GET',
            url: `/users/${this.userId}/favorites/tracks?${this.params}`,
        });

        const { items } = res.data;
        const tracks = items.map(item => item.item);
        return tracks;
    }

    async getAlbum(id: number): Promise<Album> {
        const res = await this.api({
            method: 'GET',
            url: `/albums/${id}?${this.params}`,
        });

        return res.data;
    }

    async getAlbumTracks(id: number): Promise<Track[]> {
        const res = await this.api({
            method: 'GET',
            url: `/albums/${id}/tracks?${this.params}`,
        });

        return res.data.items;
    }

    private async getFeaturedAlbums() {
        const res = await this.api({
            method: 'GET',
            url: `/pages/show_more_featured_albums?${this.localeParams}`,
        });

        const { tabs } = res.data.rows[0].modules[0];

        const topAlbums = tabs.find(tab => tab.key === 'featured-top');
        const newAlbums = tabs.find(tab => tab.key === 'featured-new');
        const staffPicks = tabs.find(tab => tab.key === 'featured-recommended');

        return {
            topAlbums: topAlbums.pagedList.items,
            newAlbums: newAlbums.pagedList.items,
            staffPicks: staffPicks.pagedList.items,
        };
    }

    async getTopAlbums(): Promise<Album[]> {
        const featuredAlbums = await this.getFeaturedAlbums();
        return featuredAlbums.topAlbums;
    }

    async getNewAlbums(): Promise<Album[]> {
        const featuredAlbums = await this.getFeaturedAlbums();
        return featuredAlbums.newAlbums;
    }

    async getStaffPickAlbums(): Promise<Album[]> {
        const featuredAlbums = await this.getFeaturedAlbums();
        return featuredAlbums.staffPicks;
    }

    async getFavoriteAlbums(): Promise<Album[]> {
        if (!this.userId || !this.sessionId) {
            await this.login();
            return this.getFavoriteAlbums();
        }

        const res = await this.api({
            method: 'GET',
            url: `/users/${this.userId}/favorites/albums?${this.params}`,
        });

        const { items } = res.data;
        const albums = items.map(item => item.item);
        return albums;
    }

    async getArtist(id: number): Promise<Artist> {
        const res = await this.api({
            method: 'GET',
            url: `/artists/${id}?${this.params}`,
        });

        return res.data;
    }

    async getArtistAlbums(id: number): Promise<Album[]> {
        const res = await this.api({
            method: 'GET',
            url: `/artists/${id}/albums?${this.params}`,
        });

        return res.data.items;
    }

    async getArtistEPsAndSingles(id: number): Promise<Album[]> {
        const res = await this.api({
            method: 'GET',
            url: `/artists/${id}/albums?${this.params}`,
        });

        return res.data.items;
    }

    async getArtistCompilations(id: number): Promise<Album[]> {
        const res = await this.api({
            method: 'GET',
            url: `/artists/${id}/albums?${this.params}&filter=COMPILATIONS`,
        });

        return res.data.items;
    }

    async getArtistTopTracks(id: number, limit?: number): Promise<Track[]> {
        const res = await this.api({
            method: 'GET',
            url: `/artists/${id}/toptracks?limit=${limit}&countryCode=${this.countryCode}`,
        });

        return res.data.items;
    }

    async getSimilarArtists(id: number): Promise<Artist[]> {
        const res = await this.api({
            method: 'GET',
            url: `/artists/${id}/similar?${this.params}`,
        });

        return res.data.items;
    }

    async getFavoriteArtists(id: number): Promise<Artist[]> {
        if (!this.userId || !this.sessionId) {
            await this.login();
            return this.getFavoriteArtists(id);
        }

        const res = await this.api({
            method: 'GET',
            url: `/users/${this.userId}/favorites/artists?${this.params}`,
        });

        const { items } = res.data;

        const artists = items.map(item => item.item);

        return artists;
    }

    async getPlaylist(uuid: string): Promise<Playlist> {
        const res = await this.api({
            method: 'GET',
            url: `/playlists/${uuid}?${this.params}`,
        });

        return res.data;
    }

    async getPlaylistTracks(uuid: string): Promise<Track[]> {
        const res = await this.api({
            method: 'GET',
            url: `/playlists/${uuid}/tracks?${this.params}`,
        });

        return res.data.items;
    }

    async getFavoritePlaylists(): Promise<Playlist[]> {
        if (!this.userId || !this.sessionId) {
            await this.login();
            return this.getFavoritePlaylists();
        }

        const res = await this.api({
            method: 'GET',
            url: `/users/${this.userId}/favorites/playlists?${this.params}`,
        });

        const { items } = res.data;
        const playlists = items.map(item => item.item);
        return playlists;
    }

    artistPicToUrl(uuid: string): ArtistPictureUrl {
        const baseUrl = `https://resources.tidal.com/images/${uuid.replace(/-/g, '/')}`;
        return {
            sm: `${baseUrl}/160x107.jpg`,
            md: `${baseUrl}/320x214.jpg`,
            lg: `${baseUrl}/640x428.jpg`,
        };
    }

    albumArtToUrl(uuid: string): AlbumArtUrl {
        const baseUrl = `https://resources.tidal.com/images/${uuid.replace(/-/g, '/')}`;
        return {
            sm: `${baseUrl}/160x160.jpg`,
            md: `${baseUrl}/320x320.jpg`,
            lg: `${baseUrl}/640x640.jpg`,
            xl: `${baseUrl}/1280x1280.jpg`,
        };
    }

}

export default Tidal;