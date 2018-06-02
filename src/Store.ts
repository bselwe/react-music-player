import { songReducers } from './Containers/SongScreen/reducers';
import { songsReducers } from './Containers/SongsScreen/reducers';
import { handleActions } from "redux-actions";
import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { artistReducers } from './Containers/ArtistsScreen/reducers';
import { albumReducers } from './Containers/AlbumsScreen/reducers';
import { nowPlayingReducers } from './Containers/NowPlayingBar/reducers';

const initialState: AppState = {
    songs: [],
    playlist: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
}

const appReducer = handleActions({
    ...songsReducers,
    ...songReducers,
    ...nowPlayingReducers,
    ...artistReducers,
    ...albumReducers
}, initialState);

let store: Store<any> = createStore(
    appReducer,
    applyMiddleware(
        thunk
    )
);

export default store;