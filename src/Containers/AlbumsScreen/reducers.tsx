import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";

export let albumReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(albumReducers);

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