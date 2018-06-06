import { FetchFavorites } from './../FavoritesScreen/reducers';
import { Artist } from './../../Infrastructure/Navigation/Routes';
import { apiClient } from './../../Services/ApiClient';
import { Dispatch } from 'redux';
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

export const UpdateFavorite = (isFavorite: boolean) =>
    async (dispatch: Dispatch<any>, getState: () => AppState) => {
        const currentSong = getState().currentSong;
        if (currentSong === undefined)
            return;

        try {
            let response: Models.ApiResponse<{}, {}>;
            if (isFavorite)
                response = await apiClient.addFavourite({ Id: currentSong.id, Title: currentSong.title, Artist: currentSong.artist.name, Photo: currentSong.album.cover });
            else 
                response = await apiClient.removeFavourite({ Id: currentSong.id });
            
            if (response.IsSuccess) {
                dispatch(UpdateFavoriteStatus(isFavorite));
                dispatch(FetchFavorites());
            }
        }
        catch {
            // Error
        }
    };


export const UpdateFavoriteStatus = createAction("SONG/UPDATE_FAVORITE_STATUS", (isFavorite: boolean) => ({ isFavorite }));
addReducer(UpdateFavoriteStatus,
    (state, action) => {
        return {
            ...state,
            currentSong: {
                ...state.currentSong,
                isFavorite: action.payload.isFavorite
            }
        };
    }
);