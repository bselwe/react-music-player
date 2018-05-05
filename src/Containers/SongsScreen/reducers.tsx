import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";
import { Thunk } from "../../Utils/Thunk";

export let songsReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(songsReducers);

export const FetchSongs = (query?: string): Thunk =>
    (dispatch, getState) => {
        (async () => {
            query = query && query.length > 0 ? query : "money";
            const songs = await Tidal.search(query, "tracks", 30);
            dispatch(UpdateSongs(songs));
        })();
    };

export const UpdateSongs = createAction("SONGS/UPDATE_SONGS", (songs: Track[]) => ({ songs }));
addReducer(UpdateSongs,
    (state, action) => {
        return {
            ...state,
            songs: action.payload.songs
        }
    }
);

export const SelectSong = createAction("SONGS/SELECT_SONG", (songId: number) => ({ songId }));
addReducer(SelectSong,
    (state, action) => {
        let song = state.songs.find(s => s.id == action.payload.songId);

        return {
            ...state,
            currentSong: song
        };
    }
);