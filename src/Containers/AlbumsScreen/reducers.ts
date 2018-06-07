import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";
import { Thunk } from "../../Utils/Thunk";

export let albumReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(albumReducers);

export const FetchAlbumSongs = (albumId: number): Thunk =>
    (dispatch, getState) => {
        (async () => {
            const songs = await Tidal.getAlbumTracks(albumId);
            dispatch(UpdateAlbumSongs(albumId, songs));
        })();
    };

export const UpdateAlbumSongs = createAction("ALBUMS/UPDATE_ALBUM_SONGS", (albumId: number, albumSongs: Track[]) => ({ albumId, albumSongs }));
addReducer(UpdateAlbumSongs,
    (state, action) => {
        return {
            ...state,
            albumsSongs: {
                ...state.albumsSongs,
                [action.payload.albumId]: action.payload.albumSongs
            }
        }
    }
);

export const FetchAlbums = (query?: string): Thunk =>
    (dispatch, getState) => {
        (async () => {
            const albums = query !== undefined && query.length > 0 ?
                await Tidal.search(query, "albums", 30) : await Tidal.getStaffPickAlbums();
            dispatch(UpdateAlbums(albums));
        })();
    };

export const UpdateAlbums = createAction("ALBUMS/UPDATE_ALBUMS", (albums: Album[]) => ({ albums }));
addReducer(UpdateAlbums,
    (state, action) => {
        return {
            ...state,
            albums: action.payload.albums
        }
    }
);

export const SelectAlbum = (albumId: number) =>
    (dispatch, getState: () => AppState) => {
        (async () => {
            let state = getState();
            let album = state.albums.find(s => s.id == albumId);

            if(album == undefined)
                album = await Tidal.getAlbum(albumId);
            dispatch(UpdateSelectedAlbum(album));
        })();
    };

export const UpdateSelectedAlbum = createAction("ALBUMS/UPDATE_SELECTED_ALBUM", (album: Album) => ({ album }));
addReducer(UpdateSelectedAlbum,
    (state, action) => {
        return {
            ...state,
            currentAlbum: action.payload.album
        };
    }
);