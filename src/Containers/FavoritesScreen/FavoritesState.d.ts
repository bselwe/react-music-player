interface FavoritesState {
    readonly favorites: Models.TrackDTO[];
}

interface AppState extends FavoritesState {
}
