import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationScreenProp } from "react-navigation";
import Routes, * as routes from "../../Routes";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from "react-navigation-redux-helpers";

export const AppNavigator = StackNavigator(Routes);

export const initialNavigationState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams(routes.Albums)
);

export const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

const AppNavigatorWithState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav,
        addListener
    })} />
);
  
const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigatorWithState);