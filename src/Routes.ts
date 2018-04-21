import HomeScreen from "./Containers/HomeScreen";
import SongScreen from "./Containers/SongScreen";
import AlbumScreen from "./Containers/AlbumScreen";

export const Home = "Home";
export const Song = "Song";
export const Album = "Album";

const Routes = {
    [Album]: { screen: AlbumScreen},
    [Home]: { screen: HomeScreen },
    [Song]: { screen: SongScreen }
};

export default Routes;