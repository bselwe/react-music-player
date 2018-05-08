interface AlbumsState {
    readonly albums: Album[];
    readonly currentAlbum?: Album;
    readonly albumsSongs: { [albumId: number]: Track[] }
}

interface AppState extends AlbumsState {
}