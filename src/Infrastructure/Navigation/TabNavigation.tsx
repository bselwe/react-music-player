import React, { Component } from "react";
import { TabNavigator, addNavigationHelpers, TabBarBottom } from "react-navigation";
import SongsNavigation from "./SongsNavigation";
import AlbumsNavigation from "./AlbumsNavigation";
import { connect } from "react-redux";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import ArtistsNavigation from "./ArtistsNavigation";

export const SongsNav = "SongsNavigation";
export const AlbumsNav = "AlbumsNavigation";
export const ArtistsNav = "ArtistsNavigation";

export const routes = {
    [SongsNav]: { screen: SongsNavigation },
    [AlbumsNav]: { screen: AlbumsNavigation },
    [ArtistsNav]: { screen: ArtistsNavigation }
};
  
export const TabBar = TabNavigator(routes, {
    animationEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
})

const initialState = TabBar.router.getStateForAction(
    TabBar.router.getActionForPathAndParams(SongsNav)
);

export const tabRouterReducer = (state = initialState, action) => {
    const nextState = TabBar.router.getStateForAction(action, state);
    return nextState || state;
};

export const tabMiddleware = createReactNavigationReduxMiddleware(
    "Tab",
    state => state.tab,
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
    nav: state.tab,
});

export default connect(mapStateToProps)(TabNavigatorWithState);