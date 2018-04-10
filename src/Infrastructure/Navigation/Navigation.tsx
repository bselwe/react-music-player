import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationScreenProp } from "react-navigation";
import routes from "../../Routes";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from "react-navigation-redux-helpers";

export const AppNavigator = StackNavigator(routes);

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