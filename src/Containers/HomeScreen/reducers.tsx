import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";

export let homeReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(homeReducers);

export const SelectSong = createAction("HOME/SELECT_SONG", (songId: string) => ({ songId }));
addReducer(SelectSong,
    (state, action) => {
        let song = state.songs.find(s => s.id == action.payload.songId);

        return {
            ...state,
            currentSong: song
        };
    }
);