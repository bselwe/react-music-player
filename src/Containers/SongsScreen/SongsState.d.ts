interface SongsState {
    readonly songs: Track[];
    readonly currentSong?: Track & { stream: string };
    readonly songDisplayed: boolean;
}

interface AppState extends SongsState {
}
