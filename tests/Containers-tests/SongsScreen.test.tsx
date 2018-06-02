import { songsReducers, UpdateSongs, UpdatePlaylist, UpdateSelectedSong } from "../../src/Containers/SongsScreen/reducers";

const initialState: AppState = {
    songs: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
    playlist: []
}

const modelSongs: Track[] = [{ id: 1, title: "Song1", duration: 2, trackNumber: 1, volumeNumber: 1, popularity: 1, copyright: "yes", artist: null, artists: null, album: null },
{ id: 1, title: "Song2", duration: 2, trackNumber: 2, volumeNumber: 2, popularity: 2, copyright: "yes", artist: null, artists: null, album: null }]

const modelCurrentSong: CurrentTrack = {...modelSongs[0], stream: "stream", time: 2, paused: true, muted: false, volume: 10, index: 1, albumId: 1}

describe('Songs actions', () => {
    it('Should update songs', () => {
        const reducer: any = songsReducers[UpdateSongs.toString()];
        expect(reducer(initialState, UpdateSongs(modelSongs))).toEqual({
            ...initialState,
            songs: modelSongs
        });
    });

    it('Should update playlist', () => {
        const reducer: any = songsReducers[UpdatePlaylist.toString()];
        expect(reducer(initialState, UpdatePlaylist(modelSongs))).toEqual({
            ...initialState,
            playlist: modelSongs
        });
    });

    it('Should update current song', () => {
        const reducer: any = songsReducers[UpdateSelectedSong.toString()];
        expect(reducer(initialState, UpdateSelectedSong(modelCurrentSong))).toEqual({
            ...initialState,
            currentSong: modelCurrentSong
        });
    });
})