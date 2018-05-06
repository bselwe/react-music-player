interface CurrentTrack extends Track {
    readonly stream: string;
    readonly time: number;
    readonly paused: boolean;
    readonly muted: boolean;
    readonly volume: number;
}

interface SongsState {
    readonly songs: Track[];
    readonly currentSong?: CurrentTrack;
    readonly songDisplayed: boolean;
}

interface AppState extends SongsState {
}
