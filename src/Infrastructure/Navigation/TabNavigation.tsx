import React, { Component } from "react";
import { View, Text } from "react-native";
import { TabNavigator, addNavigationHelpers, TabBarBottomProps } from "react-navigation";
import TabBarBottom from "../../../node_modules/react-navigation/src/views/TabView/TabBarBottom";
import SongsNavigation from "./SongsNavigation";
import AlbumsNavigation from "./AlbumsNavigation";
import { connect } from "react-redux";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import ArtistsNavigation from "./ArtistsNavigation";
import NowPlayingBar from "../../Containers/NowPlayingBar";

export const SongsNav = "SongsNavigation";
export const AlbumsNav = "AlbumsNavigation";
export const ArtistsNav = "ArtistsNavigation";

export const routes = {
    [SongsNav]: { screen: SongsNavigation },
    [AlbumsNav]: { screen: AlbumsNavigation },
    [ArtistsNav]: { screen: ArtistsNavigation }
};

class TabBarComponent extends React.Component<TabBarBottomProps> {
    render() {
        return <View>
            <NowPlayingBar />
            <TabBarBottom {...this.props} />
        </View>;
    }
}

export const TabBar = TabNavigator(routes, {
    animationEnabled: true,
    tabBarComponent: TabBarComponent,
    tabBarPosition: 'bottom'
});

const initialState = TabBar.router.getStateForAction(
    TabBar.router.getActionForPathAndParams(SongsNav)
);

export const tabRouterReducer = (state = initialState, action) => {
    const nextState = TabBar.router.getStateForAction(action, state);
    return nextState || state;
};

export const tabMiddleware = createReactNavigationReduxMiddleware(
    "Tab",
    state => state.tabRouter,
);

const addListener = createReduxBoundAddListener("Tab");

const TabNavigatorWithState = ({ dispatch, nav }) => (
    <TabBar navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav,
        addListener
    })} />
);
  
const mapStateToProps = state => ({
    nav: state.tabRouter,
});

export default connect(mapStateToProps)(TabNavigatorWithState);