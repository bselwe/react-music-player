import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Thunk } from "../../Utils/Thunk";
import Tidal from "../../Services/TidalClient";

export let songReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(songReducers);

export const ToggleSong = createAction("SONG/TOGGLE_SONG", (displayed: boolean) => ({ displayed }));
addReducer(ToggleSong,
    (state, action) => {
        return {
            ...state,
            songDisplayed: action.payload.displayed
        };
    }
);