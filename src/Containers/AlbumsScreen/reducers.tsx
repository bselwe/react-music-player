import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";
import { Thunk } from "../../Utils/Thunk";
import { Albums } from "../../Infrastructure/Navigation/AlbumsNavigation";

export let albumReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(albumReducers);

export const FetchAlbums = (query?: string): Thunk =>
    (dispatch, getState) => {
        (async () => {
            query = query && query.length > 0 ? query : "money";
            const albums = await Tidal.search(query, "albums", 30);
            dispatch(UpdateAlbums(albums));
        })();
    };

export const UpdateAlbums = createAction("SONGS/UPDATE_ALBUMS", (albums: Album[]) => ({ albums }));
addReducer(UpdateAlbums,
    (state, action) => {
        return {
            ...state,
            albums: action.payload.albums
        }
    }
);

export const SelectAlbum = createAction("HOME/SELECT_ALBUM", (albumId: number) => ({ albumId }));
addReducer(SelectAlbum,
    (state, action) => {
        let album = state.albums.find(s => s.id == action.payload.albumId);

        return {
            ...state,
            currentAlbum: album
        };
    }
);