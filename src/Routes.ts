import HomeScreen from "./Containers/HomeScreen";
import SongScreen from "./Containers/SongScreen";
import AlbumsScreen from "./Containers/AlbumsScreen";

export const Home = "Home";
export const Song = "Song";
export const Albums = "Albums";

const Routes = {
    [Albums]: { screen: AlbumsScreen},
    [Home]: { screen: HomeScreen },
    [Song]: { screen: SongScreen }
};

export default Routes;