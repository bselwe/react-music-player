import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationScreenProp } from "react-navigation";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from "react-navigation-redux-helpers";
import SongsScreen from "../../Containers/SongsScreen";
import SongScreen from "../../Containers/SongScreen";
import SongIcon from "react-native-vector-icons/Entypo";

export const Songs = "Songs";
export const Song = "Song";

export const routes = {
    [Songs]: { screen: SongsScreen },
    [Song]: { screen: SongScreen }
};

const SongsNavigator = StackNavigator(routes);

const initialState = SongsNavigator.router.getStateForAction(
    SongsNavigator.router.getActionForPathAndParams(Songs)
);

export const songsRouterReducer = (state = initialState, action) => {
    const nextState = SongsNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export const songsMiddleware = createReactNavigationReduxMiddleware(
    "Songs",
    state => state.songsRouter,
);

const addListener = createReduxBoundAddListener("Songs");

class SongsNavigatorWithState extends React.Component<any> {
    static navigationOptions = {
        tabBarLabel: "Songs",
        tabBarIcon: ({ tintColor }) => <SongIcon size={28} name="folder-music" color={ tintColor }/>
    }

    render() {
        const { dispatch, nav } = this.props
        return (
            <SongsNavigator navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav,
                addListener
            })} />
        )
    }
}
  
const mapStateToProps = state => ({
    nav: state.songsRouter,
});

export default connect(mapStateToProps)(SongsNavigatorWithState);