interface TidalOptions {
    readonly countryCode?: string;
    readonly limit?: number;
    readonly username: string;
    readonly password: string;
}

interface LoginResult {
    readonly userId: number;
    readonly sessionId: string;
    readonly countryCode: string;
}

interface ArtistInfo {
    readonly id: number;
    readonly name: string;
}

interface Artist extends ArtistInfo {
    readonly url: string;
    readonly picture: string;
    readonly popularity: number;
}

interface ArtistPictureUrl {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
}

interface AlbumInfo {
    readonly id: number;
    readonly title: string; 
    readonly cover: string;
}

interface Album extends AlbumInfo {
    readonly duration: number;
    readonly numberOfTracks: number;
    readonly numberOfVideos: number;
    readonly numberOfVolumes: number;
    readonly releaseDate: string;
    readonly copyright: string;
    readonly videoCover: string;
    readonly popularity: number;
    readonly artist?: ArtistInfo;
    readonly artists: ArtistInfo[];
}

interface AlbumArtUrl {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
}

interface Track {
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

interface Playlist {
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