interface AlbumsState {
    readonly albums?: Album[];
    readonly currentAlbum?: Album;
}

interface AppState extends AlbumsState {
}