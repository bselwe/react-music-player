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

export const UpdateArtistAlbums = createAction("ALBUMS/UPDATE_ARTIST_ALBUMS", (artistId: number, artistAlbums: Album[]) => ({ artistId, artistAlbums }));
addReducer(UpdateArtistAlbums,
    (state, action) => {
        return {
            ...state,
            artistsAlbums: { 
                ...state.artistsAlbums,
                [action.payload.artistId]: action.payload.artistAlbums
            }
        }
    }
);

export const FetchArtistAlbums = (artistId: number): Thunk =>
    (dispatch, getState) => {
        (async () => {
            
            const albums = await Tidal.getArtistAlbums(artistId);
            dispatch(UpdateArtistAlbums(artistId, albums));
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


// export const FetchAlbums = (artistId: number): Thunk =>
//     (dispatch, getState) => {
//         (async () => {
//             const albums = await Tidal.getArtistCompilations(artistId);
//             dispatch(UpdateArtistAlbums(artistId, albums));
//         })();
//     };


