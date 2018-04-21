interface Artist {
    readonly id: string;
    readonly name: string;
    readonly albums: Album[];
    readonly image: string;
}

interface ArtistsState {
    readonly artists?: Artist[];
    readonly currentArtist?: Artist;
}

interface AppState extends ArtistsState {
}
