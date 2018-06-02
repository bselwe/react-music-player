import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import SignIn from "../SignIn";

interface AuthenticationProps {
    children?: React.ReactNode;
}

export const Authentication = connect(
    (state: AppState) => {
        return {
            isSignedIn: state.isSignedIn
        };
    }
)(props => props.isSignedIn ? <View>{props.children}</View> : <SignIn/>);