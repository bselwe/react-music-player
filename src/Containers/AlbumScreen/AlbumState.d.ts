interface Album {
    readonly id: string;
    readonly name: string;
    readonly artist: string;
    readonly songs: Song[];
    readonly image: string;
}

interface AlbumState {
    readonly albums?: Album[];
    readonly currentAlbum?: Album;
}

interface AppState extends AlbumState {
}
