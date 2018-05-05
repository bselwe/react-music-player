import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";
import { Thunk } from "../../Utils/Thunk";

export let artistReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(artistReducers);

export const FetchArtists = (query?: string): Thunk =>
    (dispatch, getState) => {
        (async () => {
            query = query && query.length > 0 ? query : "Ada";
            const artist = await Tidal.search(query, "artists", 30);
            dispatch(UpdateArtists(artist));
        })();
    };

export const UpdateArtists = createAction("ARTISTS/UPDATE_ARTISTS", (artists: Artist[]) => ({ artists }));
addReducer(UpdateArtists,
    (state, action) => {
        return {
            ...state,
            artists: action.payload.artists
        }
    }
);

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
