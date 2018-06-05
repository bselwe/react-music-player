import { loginManager } from './Services/LoginManager';
import { songReducers } from './Containers/SongScreen/reducers';
import { songsReducers } from './Containers/SongsScreen/reducers';
import { handleActions } from "redux-actions";
import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { artistReducers } from './Containers/ArtistsScreen/reducers';
import { albumReducers } from './Containers/AlbumsScreen/reducers';
import { nowPlayingReducers } from './Containers/NowPlayingBar/reducers';
import { singInReducers } from './Containers/SignInScreen/reducers';
import { singUpReducers } from './Containers/SignUpScreen/reducers';

export const initialState: AppState = {
    songs: [],
    playlist: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
    isSignedIn: false
}

const appReducer = handleActions({
    ...songsReducers,
    ...songReducers,
    ...nowPlayingReducers,
    ...artistReducers,
    ...albumReducers,
    ...singInReducers,
    ...singUpReducers
}, initialState);

let store: Store<any> = createStore(
    appReducer,
    applyMiddleware(
        thunk
    )
);

export default store;