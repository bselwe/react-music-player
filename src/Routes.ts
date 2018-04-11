import HomeScreen from "./Containers/HomeScreen";
import SongScreen from "./Containers/SongScreen";

export const Home = "Home";
export const Song = "Song";

const Routes = {
    [Home]: { screen: HomeScreen },
    [Song]: { screen: SongScreen }
};

export default Routes;