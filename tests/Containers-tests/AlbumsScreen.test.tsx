import { albumReducers, UpdateAlbumSongs, UpdateAlbums, UpdateSelectedAlbum } from "../../src/Containers/AlbumsScreen/reducers";
import { Albums } from "../../src/Infrastructure/Navigation/Routes";

const initialState: AppState = {
    songs: [],
    songDisplayed: false,
    artists: [],
    artistsAlbums: {},
    albums: [],
    albumsSongs: {},
    playlist: []
}

const modelSongs: Track[] = [{ id: 1, title: "Song1", duration: 2, trackNumber: 1, volumeNumber: 1, popularity: 1, copyright: "yes", artist: null, artists: null, album: null },
{ id: 1, title: "Song2", duration: 2, trackNumber: 2, volumeNumber: 2, popularity: 2, copyright: "yes", artist: null, artists: null, album: null }]
const modelAlbumInfo: AlbumInfo = {id: 1, title: "title", cover: "cover"}
const modelAlbums: Album[] = [{...modelAlbumInfo, duration: 2, numberOfTracks: 1, numberOfVideos: 1, numberOfVolumes: 5, releaseDate: "01.10.1212", copyright: "yes", videoCover: "img", popularity: 1, artist: null, artists: null}]

describe('Albums actions', () => {
    it('Should update album songs', () => {
        const reducer: any = albumReducers[UpdateAlbumSongs.toString()];
        expect(reducer(initialState, UpdateAlbumSongs(1, modelSongs))).toEqual({
            ...initialState,
            albumsSongs: {
                ...initialState.albumsSongs,
                1: modelSongs
            }
        });
    });

    it('Should update albums', () => {
        const reducer: any = albumReducers[UpdateAlbums.toString()];
        expect(reducer(initialState, UpdateAlbums(modelAlbums))).toEqual({
            ...initialState,
            albums: modelAlbums
        });
    });

    it('Should update selected album', () => {
        const reducer: any = albumReducers[UpdateSelectedAlbum.toString()];
        expect(reducer(initialState, UpdateSelectedAlbum(modelAlbums[0]))).toEqual({
            ...initialState,
            currentAlbum: modelAlbums[0]
        });
    });
})