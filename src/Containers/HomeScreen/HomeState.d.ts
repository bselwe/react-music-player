interface Song {
    readonly id: string;
    readonly name: string;
    readonly image: string;
}

interface HomeState {
    readonly songs?: Song[];
    readonly currentSong?: Song;
}

interface AppState extends HomeState {
}