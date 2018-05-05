import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";

// Tidal.search("Yelawolf", "artists").then(results => {
//     console.log(results);
// });

export let songsReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(songsReducers);

export const SelectSong = createAction("SONGS/SELECT_SONG", (songId: string) => ({ songId }));
addReducer(SelectSong,
    (state, action) => {
        let song = state.songs.find(s => s.id == action.payload.songId);

        return {
            ...state,
            currentSong: song
        };
    }
);