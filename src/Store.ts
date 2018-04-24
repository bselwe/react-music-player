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
    ],
    albums: [
        { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
            { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
            { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
            { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
            { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
            { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
            { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }],
        image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
        { id: "album2", name: "Chill Hop Mix", artist: "Redux", songs: [
            { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
            { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
            { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
            { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
            { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
            { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }],
        image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
        { id: "album3", name: "DAMN.", artist: "Kendrick Lamar", songs: [
            { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
            { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
            { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
            { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
            { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
            { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }],
        image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
        { id: "album4", name: "Currents", artist: "Tame Impala", songs: [
            { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
            { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
            { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
            { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
            { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
            { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }],
        image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
        { id: "album5", name: "Ferdinand Franz", artist: "Franz Ferdinand", songs: [
            { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
            { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
            { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
            { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
            { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
            { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }],
        image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" }
    ],
    artists: [
        { id: "artist1", name: "Yelawolf", albums: [
            { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
                { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
                { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
                { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
                { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
                { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
                { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }
            ]}],
            image: "http://www.southpawer.com/wp-content/uploads/2016/12/yelawolf-mwa-new-stage-name-sober-up-rehab.jpg"
        },
        { id: "artist2", name: "Kendrick Lamar", albums: [
            { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
                { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
                { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
                { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
                { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
                { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
                { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }
            ]}],
            image: "https://urbanmatter.com/chicago/wp-content/uploads/2017/07/ken.jpeg"
        },
        { id: "artist3", name: "Franz Ferdinand", albums: [
            { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
                { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
                { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
                { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
                { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
                { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
                { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }
            ]}],
            image: "https://img.wennermedia.com/article-leads-horizontal/franz-ferdinand-12cea9f4-03d0-4edb-a60c-26c2ec846e8b.jpg"
        },
        { id: "artist4", name: "Tame Impala", albums: [
            { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
                { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
                { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
                { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
                { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
                { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
                { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }
            ]}],
            image: "http://qultqultury.pl/wp-content/uploads/2015/11/tame-impala.jpg"
        },
        { id: "artist5", name: "Cage the Elephant", albums: [
            { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
                { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
                { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
                { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
                { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
                { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
                { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }
            ]}],
            image: "https://img.wennermedia.com/article-leads-horizontal/cage-the-elephant_607_wk_bw_v1jpg_randee-st-nicolas-for-press-site-c29a767b-e312-4629-837d-957b8e23e2cc.jpg"
        }]
        // currentAlbum : { id: "album1", name: "Co Za Mixtape", artist: "Many", songs: [
        //     { id: "empty-bottles", name: "Empty Bottles", artist: "Yelawolf", album: "Love Story",image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" },
        //     { id: "take-me-out", name: "Take Me Out", artist: "Franz Ferdinand", album: "Franz Ferdinand",image: "http://i3.ytimg.com/vi/GhCXAiNz9Jo/maxresdefault.jpg" },
        //     { id: "the-less-i-know-the-better", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", image: "https://www.jambase.com/wp-content/uploads/2015/11/tameimpalavideo-1480x832.jpg" },
        //     { id: "dna", name: "DNA", artist: "Kendrick Lamar", album: "DAMN.", image: "https://www.vladtv.com/images/size_fs/video-226925.jpg" },
        //     { id: "tamagochi", name: "Tamagochi", artist: "TACONAFIDE", album: "Single", image: "https://i.ytimg.com/vi/odWxQ5eEnfE/maxresdefault.jpg" },
        //     { id: "aint-no-rest", name: "Ain't No Rest for the Wicked", artist: "Cage the Elephant", album: "Cage the Elephant", image: "https://sosimpullsitebin.s3.amazonaws.com/wp-content/uploads/2017/08/hqdefault.jpg" }],
        // image: "https://i2.wp.com/truetoo.co/wp-content/uploads/2015/05/YELAWOLF-LS-COVER-DARK-PA-650x650.jpg?fit=500%2C300" }
};

const appReducer = handleActions({
    ...songsReducers,
    ...songReducers,
    ...artistReducers
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