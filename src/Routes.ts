import HomeScreen from "./Components/HomeScreen";
import OtherScreen from "./Components/OtherScreen";

export const Home = "Home";
export const Other = "Other";

const Routes = {
    [Home]: { screen: HomeScreen },
    [Other]: { screen: OtherScreen }
};

export default Routes;