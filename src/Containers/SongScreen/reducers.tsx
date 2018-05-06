import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Thunk } from "../../Utils/Thunk";
import Tidal from "../../Services/TidalClient";

export let songReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(songReducers);

export const FetchSongStream = (songId: number): Thunk =>
    (dispatch, getState) => {
        (async () => {
            const stream = await Tidal.getTrackStreamUrl(songId);
            dispatch(UpdateSongStream(stream));
        })();
    };

export const UpdateSongStream = createAction("SONGS/UPDATE_SONG_STREAM", (stream: TrackStream) => ({ stream }));
addReducer(UpdateSongStream,
    (state, action) => {
        return {
            ...state,
            currentSong: {
                ...state.currentSong,
                stream: action.payload.stream.url
            }
        }
    }
);

export const ToggleSong = createAction("SONG/TOGGLE_SONG", (displayed: boolean) => ({ displayed }));
addReducer(ToggleSong,
    (state, action) => {
        return {
            ...state,
            songDisplayed: action.payload.displayed
        };
    }
);