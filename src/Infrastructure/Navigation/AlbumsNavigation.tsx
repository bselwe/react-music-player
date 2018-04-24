import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationScreenProp } from "react-navigation";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from "react-navigation-redux-helpers";
import AlbumsScreen from "../../Containers/AlbumsScreen";
import AlbumScreen from "../../Containers/AlbumScreen";
import AlbumIcon from "react-native-vector-icons/MaterialCommunityIcons";

export const Albums = "Albums";
export const Album = "Album"

export const routes = {
    [Albums]: { screen: AlbumsScreen },
    [Album]: { screen: AlbumScreen}
};

export const AlbumsNavigator = StackNavigator(routes);

const initialState = AlbumsNavigator.router.getStateForAction(
    AlbumsNavigator.router.getActionForPathAndParams(Albums)
);

export const albumsRouterReducer = (state = initialState, action) => {
    const nextState = AlbumsNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export const albumsMiddleware = createReactNavigationReduxMiddleware(
    "Albums",
    state => state.albums,
);

const addListener = createReduxBoundAddListener("Albums");

// const AlbumsNavigatorWithState = ({ dispatch, nav }) => (
//     <AlbumsNavigator navigation={addNavigationHelpers({
//         dispatch: dispatch,
//         state: nav,
//         addListener
//     })} />
// );

class AlbumsNavigatorWithState extends React.Component<any> {
    static navigationOptions = {
        tabBarLabel: "Albums",
        tabBarIcon: ({ tintColor }) => <AlbumIcon size={28} name="album" color={ tintColor }/>
    }

    render() {
        const { dispatch, nav } = this.props
        return (
            <AlbumsNavigator navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav,
                addListener
            })} />
        )
    }
}
  
const mapStateToProps = state => ({
    nav: state.albums,
});

export default connect(mapStateToProps)(AlbumsNavigatorWithState);