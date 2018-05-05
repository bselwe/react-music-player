import { songReducers } from './Containers/SongScreen/reducers';
import { songsReducers } from './Containers/SongsScreen/reducers';
import { handleActions } from "redux-actions";
import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { songsMiddleware, songsRouterReducer } from './Infrastructure/Navigation/SongsNavigation';
import { tabMiddleware, tabRouterReducer } from './Infrastructure/Navigation/TabNavigation';
import { albumsMiddleware, AlbumsNavigator, albumsRouterReducer } from './Infrastructure/Navigation/AlbumsNavigation';
import { artistsRouterReducer, artistsMiddleware } from './Infrastructure/Navigation/ArtistsNavigation';
import { artistReducers } from './Containers/ArtistsScreen/reducers';
import { albumReducers } from './Containers/AlbumsScreen/reducers';

const initialState: AppState = {
    songs: [],
    songDisplayed: false,
    artists: [],
    albums: [],
    albumsSongs: {}
}

const appReducer = handleActions({
    ...songsReducers,
    ...songReducers,
    ...artistReducers,
    ...albumReducers
}, initialState);

const reducers = combineReducers({
    tab: tabRouterReducer,
    songs: songsRouterReducer,
    albums: albumsRouterReducer,
    artists: artistsRouterReducer,
    app: appReducer 
});

let store: Store<any> = createStore(
    reducers,
    applyMiddleware(
        thunk, 
        tabMiddleware,
        songsMiddleware,
        albumsMiddleware,
        artistsMiddleware
    )
);

export default store;