interface Artist {
    readonly id: string;
    readonly name: string;
    readonly artist: string;
    readonly album: string;
    readonly image: string;
}

interface SongsState {
    readonly songs?: Artist[];
    readonly currentSong?: Artist;
}

interface AppState extends SongsState {
}
