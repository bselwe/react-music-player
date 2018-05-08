interface CurrentTrack extends Track {
    readonly stream: string;
    readonly time: number;
    readonly paused: boolean;
    readonly muted: boolean;
    readonly volume: number;
}

interface SongsState {
    readonly songs: Track[];
    readonly playlist: Track[];
    readonly currentSong?: CurrentTrack;
    readonly currentSongIndex: number;
    readonly songDisplayed: boolean;
}

interface AppState extends SongsState {
}
