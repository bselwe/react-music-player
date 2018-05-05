interface ArtistsState {
    readonly artists?: Artist[];
    readonly currentArtist?: Artist;
}

interface AppState extends ArtistsState {
}
