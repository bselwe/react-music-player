import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";

export let songsReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(songsReducers);

// Tidal.getTopAlbums().then(albums => {
//     let album = albums[0];
//     console.log(album);
//     Tidal.getAlbumTracks(album.id).then(tracks => {
//         let track = tracks[0];
//         console.log(track);
//         Tidal.getTrackStreamUrl(44593521).then(stream => {
//             console.log(stream);
//         })
//     })
// });

export const SelectSong = createAction("SONGS/SELECT_SONG", (songId: string) => ({ songId }));
addReducer(SelectSong,
    (state, action) => {
        let song = state.songs.find(s => s.id == action.payload.songId);

        return {
            ...state,
            currentSong: song
        };
    }
);