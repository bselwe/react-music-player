interface Album {
    readonly id: string;
    readonly name: string;
    readonly artist: string;
    readonly songs: Song[];
    readonly image: string;
}

interface AlbumsState {
    readonly albums?: Album[];
    readonly currentAlbum?: Album;
}

interface AppState extends AlbumsState {
}
