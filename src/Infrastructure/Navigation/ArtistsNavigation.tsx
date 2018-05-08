import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationScreenProp } from "react-navigation";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from "react-navigation-redux-helpers";
import ArtistsScreen from "../../Containers/ArtistsScreen";
import ArtistScreen from "../../Containers/ArtistScreen";
import ArtistIcon from "react-native-vector-icons/MaterialCommunityIcons";

export const Artists = "Artists";
export const Artist = "Artist";

export const routes = {
    [Artists]: { screen: ArtistsScreen },
    [Artist]: {screen: ArtistScreen}
};

export const ArtistsNavigator = StackNavigator(routes);

const initialState = ArtistsNavigator.router.getStateForAction(
    ArtistsNavigator.router.getActionForPathAndParams(Artists)
);

export const artistsRouterReducer = (state = initialState, action) => {
    const nextState = ArtistsNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export const artistsMiddleware = createReactNavigationReduxMiddleware(
    "Artists",
    state => state.artistsRouter,
);

const addListener = createReduxBoundAddListener("Artists");

class ArtistsNavigatorWithState extends React.Component<any> {
    static navigationOptions = {
        tabBarLabel: "Artists",
        tabBarIcon: ({ tintColor }) => <ArtistIcon size={28} name="artist" color={ tintColor }/>
    }

    render() {
        const { dispatch, nav } = this.props
        return (
            <ArtistsNavigator navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav,
                addListener
            })} />
        )
    }
}
  
const mapStateToProps = state => ({
    nav: state.artistsRouter,
});

export default connect(mapStateToProps)(ArtistsNavigatorWithState);