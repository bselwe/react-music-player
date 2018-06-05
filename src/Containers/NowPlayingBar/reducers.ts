import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Thunk } from "../../Utils/Thunk";
import Tidal from "../../Services/TidalClient";

export let nowPlayingReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(nowPlayingReducers);

export const UpdateSongTime = createAction("NOW_PLAYING/UPDATE_SONG_TIME", (time: number) => ({ time }));
addReducer(UpdateSongTime,
    (state, action) => {
        return {
            ...state,
            currentSong: {
                ...state.currentSong,
                time: action.payload.time
            }
        };
    }
);

export const UpdateSongPaused = createAction("NOW_PLAYING/UPDATE_SONG_PAUSED", (paused: boolean) => ({ paused }));
addReducer(UpdateSongPaused,
    (state, action) => {
        return {
            ...state,
            currentSong: {
                ...state.currentSong,
                paused: action.payload.paused
            }
        };
    }
);

export const UpdateSongMuted = createAction("NOW_PLAYING/UPDATE_SONG_MUTED", (muted: boolean) => ({ muted }));
addReducer(UpdateSongMuted,
    (state, action) => {
        return {
            ...state,
            currentSong: {
                ...state.currentSong,
                muted: action.payload.muted
            }
        };
    }
);

export const UpdateSongVolume = createAction("NOW_PLAYING/UPDATE_SONG_VOLUME", (volume: number) => ({ volume }));
addReducer(UpdateSongVolume,
    (state, action) => {
        return {
            ...state,
            currentSong: {
                ...state.currentSong,
                volume: action.payload.volume
            }
        };
    }
);