interface CurrentTrack extends Track {
    readonly stream: string;
}

interface SongsState {
    readonly songs: Track[];
    readonly currentSong?: CurrentTrack;
    readonly songDisplayed: boolean;
}

interface AppState extends SongsState {
}
