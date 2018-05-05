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

    export interface ArtistInfo {
        readonly id: number;
        readonly name: string;
    }

    export interface Artist extends ArtistInfo {
        readonly url: string;
        readonly picture: string;
        readonly popularity: number;
    }

    export interface ArtistPictureUrl {
        readonly sm: string;
        readonly md: string;
        readonly lg: string;
    }

    export interface AlbumInfo {
        readonly id: number;
        readonly title: string; 
        readonly cover: string;
    }

    export interface Album extends AlbumInfo {
        readonly duration: number;
        readonly numberOfTracks: number;
        readonly numberOfVideos: number;
        readonly numberOfVolumes: number;
        readonly releaseDate: string;
        readonly copyright: string;
        readonly videoCover: string;
        readonly popularity: number;
        readonly artist: ArtistInfo;
        readonly artists: ArtistInfo[];
    }

    export interface AlbumArtUrl {
        readonly sm: string;
        readonly md: string;
        readonly lg: string;
        readonly xl: string;
    }

    export interface Track {
        readonly id: number;
        readonly title: string;
        readonly duration: number;
        readonly trackNumber: number;
        readonly volumeNumber: number;
        readonly popularity: number;
        readonly copyright: string;
        readonly artist: ArtistInfo;
        readonly artists: ArtistInfo[];
        readonly album: AlbumInfo;
    }

    export interface Playlist {
        readonly uuid: string;
        readonly title: string;
        readonly numberOfTracks: number;
        readonly numberOfVideos: number;
        readonly creator: { id: number };
        readonly description: number;
        readonly duration: number;
        readonly lastUpdated: string;
        readonly created: string;
        readonly publicPlaylist: boolean;
        readonly image: string;
        readonly popularity: number;
    }

    export default class Tidal {
        constructor(options: TidalOptions);
        login(username: string, password: string): LoginResult;
        search(query: string, type: "artists", limit?: number): Promise<Artist[]>;
        search(query: string, type: "albums", limit?: number): Promise<Album[]>;
        search(query: string, type: "tracks", limit?: number): Promise<Track[]>;
        search(query: string, type: "playlists", limit?: number): Promise<Playlist[]>;
        getTrack(id: number): Promise<Track>;
        getFavoriteTracks(): Promise<Track[]>;
        getAlbum(id: number): Promise<Album>;
        getAlbumTracks(id: number): Promise<Track[]>;
        getTopAlbums(): Promise<Album[]>;
        getNewAlbums(): Promise<Album[]>;
        getStaffPickAlbums(): Promise<Album[]>;
        getFavoriteAlbums(): Promise<Album[]>;
        getArtist(id: number): Promise<Artist>;
        getArtistAlbums(id: number): Promise<Album[]>;
        getArtistEPsAndSingles(id: number): Promise<Album[]>;
        getArtistCompilations(id: number): Promise<Album[]>;
        getArtistTopTracks(id: number, limit?: number): Promise<Track[]>;
        getSimilarArtists(id: number): Promise<Artist[]>;
        getFavoriteArtists(id: number): Promise<Artist[]>;
        getPlaylist(uuid: string): Promise<Playlist>;
        getPlaylistTracks(uuid: string): Promise<Track[]>;
        getFavoritePlaylists(): Promise<Playlist[]>;
        artistPicToUrl(uuid: string): ArtistPictureUrl;
        albumArtToUrl(uuid: string): AlbumArtUrl;
    }
}