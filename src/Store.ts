import { handleActions } from "redux-actions";
import { homeReducers, SelectSong } from "./Containers/HomeScreen/reducers";
import { navigationMiddleware } from "./Infrastructure/Navigation/Navigation";
import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from "./Infrastructure/Navigation/Reducers";

const initialState: AppState = {
    songs: [
        { id: "empty-bottles", name: "Empty bottles - Yelawolf", image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
        { id: "take-me-out", name: "Take me out - Franz Ferdinand", image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
        { id: "the-less-i-know-the-better", name: "The Less I Know The Better - Tame Impala", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
        { id: "dna", name: "DNA - Kendrick Lamar", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" }
    ]
};

const appReducer = handleActions({
    ...homeReducers
}, initialState);

const reducers = combineReducers({
    nav: routerReducer,
    app: appReducer
});

let store: Store<any> = createStore(
    reducers,
    applyMiddleware(thunk, navigationMiddleware)
);

export default store;