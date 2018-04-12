import { handleActions } from "redux-actions";
import { homeReducers, SelectSong } from "./Containers/HomeScreen/reducers";
import { navigationMiddleware } from "./Infrastructure/Navigation/Navigation";
import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from "./Infrastructure/Navigation/Reducers";

const initialState: AppState = {
    songs: [
        { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
        { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
        { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
        { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
        { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
        { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" },
        { id: "empty-bottles1", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
        { id: "take-me-out1", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
        { id: "the-less-i-know-the-better1", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
        { id: "dna1", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
        { id: "tamagochi1", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
        { id: "aint-no-rest1", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" },
        { id: "empty-bottles2", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
        { id: "take-me-out2", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
        { id: "the-less-i-know-the-better2", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
        { id: "dna2", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
        { id: "tamagochi2", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
        { id: "aint-no-rest2", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }
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