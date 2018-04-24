interface Song {
    readonly id: string;
    readonly name: string;
    readonly artist: string;
    readonly album: string;
    readonly image: string;
}

interface SongsState {
    readonly songs?: Song[];
    readonly currentSong?: Song;
    readonly songDisplayed: boolean;
}

interface AppState extends SongsState {
}
