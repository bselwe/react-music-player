import { songReducers, ToggleSong } from "../../src/Containers/SongScreen/reducers";

const initialState: AppState = {
    songs: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
    playlist: []
}

describe('Song actions', () => {
    it('Should update song displayed', () => {
        const reducer: any = songReducers[ToggleSong.toString()];
        expect(reducer(initialState, ToggleSong(true))).toEqual({
            ...initialState,
            songDisplayed: true
        });
    });
})