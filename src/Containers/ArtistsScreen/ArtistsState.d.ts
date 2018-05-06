interface ArtistsState {
    readonly artists: Artist[];
    readonly currentArtist?: Artist;
    readonly artistsAlbums: { [artistId: number]: Album[] }
}

interface AppState extends ArtistsState {
}
