import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import Tidal from "../../Services/TidalClient";
import { Thunk } from "../../Utils/Thunk";
import { apiClient } from "../../Services/ApiClient";

export let songsReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(songsReducers);

export const FetchSongs = (query?: string): Thunk =>
    (dispatch, getState) => {
        (async () => {
            query = query && query.length > 0 ? query : "a";
            const songs = await Tidal.search(query, "tracks", 30);
            dispatch(UpdateSongs(songs));
        })();
    };

export const UpdateSongs = createAction("SONGS/UPDATE_SONGS", (songs: Track[]) => ({ songs }));
addReducer(UpdateSongs,
    (state, action) => {
        return {
            ...state,
            songs: action.payload.songs
        }
    }
);

export const SelectSong = (songId: number, albumId?: number) =>
    (dispatch, getState: () => AppState) => {
        (async () => {
            let state = getState();
            let songs = albumId !== undefined ? state.albumsSongs[albumId] : state.songs;
            let song = songs.find(s => s.id == songId);
            if (song === undefined)
                song = await Tidal.getTrack(songId);

            let isFavoriteResponse = await apiClient.isFavourite(song.id);
            let stream = (await Tidal.getTrackStreamUrl(songId)).url;
            dispatch(UpdateSelectedSong({
                ...song,
                stream,
                albumId,
                paused: false,
                time: 0,
                muted: false,
                volume: state.currentSong !== undefined ? state.currentSong.volume : 1.0,
                index: songs.indexOf(song),
                isFavorite: isFavoriteResponse.IsSuccess ? isFavoriteResponse.Response.IsFavourite : false
            }
            ));

            dispatch(UpdatePlaylist(songs));
        })();
    };

export const UpdatePlaylist = createAction("SONGS/UPDATE_PLAYLIST", (songs: Track[]) => ({ songs }));
addReducer(UpdatePlaylist,
    (state, action) => {
        return {
            ...state,
            playlist: action.payload.songs
        }
    }
);

export const SelectPrevSong = () =>
    (dispatch, getState: () => AppState) => {
        (async () => {
            let state = getState();
            let songIndex = state.currentSong.index - 1 < 0 ? state.playlist.length - 1 : state.currentSong.index - 1;
            let song = state.playlist.find(s => state.playlist.indexOf(s) == songIndex);

            let isFavoriteResponse = await apiClient.isFavourite(song.id);
            let stream = (await Tidal.getTrackStreamUrl(song.id)).url;
            dispatch(UpdateSelectedSong({
                ...song,
                stream,
                paused: false,
                time: 0,
                muted: false,
                volume: state.currentSong !== undefined ? state.currentSong.volume : 1.0,
                index: state.playlist.indexOf(song),
                isFavorite: isFavoriteResponse.IsSuccess ? isFavoriteResponse.Response.IsFavourite : false
            }
            ));
        })();
    };

export const SelectNextSong = () =>
    (dispatch, getState: () => AppState) => {
        (async () => {
            let state = getState();
            let songIndex = state.currentSong.index + 1 >= state.playlist.length ? 0 : state.currentSong.index + 1;
            let song = state.playlist.find(s => state.playlist.indexOf(s) == songIndex);

            let isFavoriteResponse = await apiClient.isFavourite(song.id);
            let stream = (await Tidal.getTrackStreamUrl(song.id)).url;
            dispatch(UpdateSelectedSong({
                ...song,
                stream,
                paused: false,
                time: 0,
                muted: false,
                volume: state.currentSong !== undefined ? state.currentSong.volume : 1.0,
                index: state.playlist.indexOf(song),
                isFavorite: isFavoriteResponse.IsSuccess ? isFavoriteResponse.Response.IsFavourite : false
            }
            ));
        })();
    };

export const UpdateSelectedSong = createAction("SONGS/UPDATE_SELECTED_SONG", (song: CurrentTrack) => ({ song }));
addReducer(UpdateSelectedSong,
    (state, action) => {
        return {
            ...state,
            currentSong: action.payload.song
        };
    }
);