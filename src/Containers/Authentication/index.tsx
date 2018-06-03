import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { Redirect, Switch, Route } from "react-router-native";
import * as routes from "../../Infrastructure/Navigation/Routes";

interface AuthenticationProps {
    children?: React.ReactNode;
}

export const Authentication = connect(
    (state: AppState) => {
        return {
            isSignedIn: state.isSignedIn
        };
    }
)(props => props.isSignedIn ? <View>{props.children}</View> : <Switch>
    <Route path={"/"} exact component={SignIn} />
    <Route path={routes.SignUp} exact component={SignUp} />
</Switch>);