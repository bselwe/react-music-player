interface SongsState {
    readonly songs?: Track[];
    readonly currentSong?: Track;
    readonly songDisplayed: boolean;
}

interface AppState extends SongsState {
}
