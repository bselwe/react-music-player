import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";
import { Thunk } from "../../Utils/Thunk";
import { apiClient } from "../../Services/ApiClient";

export let favoritesReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(favoritesReducers);

export const FetchFavorites = (): Thunk =>
    (dispatch, getState) => {
        (async () => {
            const favoritesResponse = await apiClient.fetchFavourites();
            if(favoritesResponse.IsSuccess)
                dispatch(UpdateFavorites(favoritesResponse.Response));
        })();
    };

export const UpdateFavorites = createAction("FAVORITES/UPDATE_FAVORITES", (favorites: Models.TrackDTO[]) => ({ favorites }));
addReducer(UpdateFavorites,
    (state, action) => {
        return {
            ...state,
            favorites: action.payload.favorites
        }
    }
);