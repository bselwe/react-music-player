import { nowPlayingReducers, UpdateSongTime, UpdateSongPaused, UpdateSongMuted, UpdateSongVolume } from "../../src/Containers/NowPlayingBar/reducers";

const initialState: AppState = {
    songs: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
    playlist: []
}

describe('NowPlaying actions', () => {
    it('Should update time', () => {
        const reducer: any = nowPlayingReducers[UpdateSongTime.toString()];
        expect(reducer(initialState, UpdateSongTime(5))).toEqual({
            ...initialState,
            currentSong: {
                ...initialState.currentSong,
                time: 5
            }
        });
    });

    it('Should update song paused', () => {
        const reducer: any = nowPlayingReducers[UpdateSongPaused.toString()];
        expect(reducer(initialState, UpdateSongPaused(true))).toEqual({
            ...initialState,
            currentSong: {
                ...initialState.currentSong,
                paused: true
            }
        });
    });

    it('Should update song muted', () => {
        const reducer: any = nowPlayingReducers[UpdateSongMuted.toString()];
        expect(reducer(initialState, UpdateSongMuted(true))).toEqual({
            ...initialState,
            currentSong: {
                ...initialState.currentSong,
                muted: true
            }
        });
    });

    it('Should update song volume', () => {
        const reducer: any = nowPlayingReducers[UpdateSongVolume.toString()];
        expect(reducer(initialState, UpdateSongVolume(10))).toEqual({
            ...initialState,
            currentSong: {
                ...initialState.currentSong,
                volume: 10
            }
        });
    });
})