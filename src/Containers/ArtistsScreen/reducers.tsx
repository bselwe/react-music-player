import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";

export let artistReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(artistReducers);

export const SelectArtist = createAction("HOME/SELECT_ARTIST", (artistId: string) => ({ artistId }));
addReducer(SelectArtist,
    (state, action) => {
        let artist = state.artists.find(s => s.id == action.payload.artistId);

        return {
            ...state,
            currentArtist: artist
        };
    }
);