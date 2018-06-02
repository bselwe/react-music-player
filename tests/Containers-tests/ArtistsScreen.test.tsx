import { artistReducers, UpdateArtistAlbums, UpdateArtists, SelectArtist } from "../../src/Containers/ArtistsScreen/reducers";

const initialState: AppState = {
    songs: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
    playlist: []
}

const modelAlbumInfo: AlbumInfo = {id: 1, title: "title", cover: "cover"}
const modelAlbums: Album[] = [{...modelAlbumInfo, duration: 2, numberOfTracks: 1, numberOfVideos: 1, numberOfVolumes: 5, releaseDate: "01.10.1212", copyright: "yes", videoCover: "img", popularity: 1, artist: null, artists: null}]
const modelArtistInfo: ArtistInfo = {id: 1, name: "artist1"}
const modelArtists: Artist[] = [{...modelArtistInfo, url: "www", picture: "pic", popularity: 1}]

describe('Artists actions', () => {
    it('Should update artist albums', () => {
        const reducer: any = artistReducers[UpdateArtistAlbums.toString()];
        expect(reducer(initialState, UpdateArtistAlbums(1, modelAlbums))).toEqual({
            ...initialState,
            artistsAlbums: { 
                ...initialState.artistsAlbums,
                1: modelAlbums
            }
        });
    });

    it('Should update artist', () => {
        const reducer: any = artistReducers[UpdateArtists.toString()];
        expect(reducer(initialState, UpdateArtists(modelArtists))).toEqual({
            ...initialState,
            artists: modelArtists
        });
    });

    it('Should update selected artist', () => {
        const updateArtistsSoThatItIsPossibleToSelectArtist: any = artistReducers[UpdateArtists.toString()];
        var modifiedState = updateArtistsSoThatItIsPossibleToSelectArtist(initialState, UpdateArtists(modelArtists));
        const reducer: any = artistReducers[SelectArtist.toString()];
        expect(reducer(modifiedState, SelectArtist(1))).toEqual({
            ...modifiedState,
            currentArtist: modelArtists[0]
        });
    });
})