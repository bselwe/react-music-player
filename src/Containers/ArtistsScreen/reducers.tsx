import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";

export let artistReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(artistReducers);

export const SelectArtist = createAction("ARTISTS/SELECT_ARTIST", (artistId: number) => ({ artistId }));
addReducer(SelectArtist,
    (state, action) => {
        let artist = state.artists.find(s => s.id == action.payload.artistId);

        return {
            ...state,
            currentArtist: artist
        };
    }
);