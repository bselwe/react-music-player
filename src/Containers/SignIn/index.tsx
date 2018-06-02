import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignInWithPassword } from "./reducers";
import { styles } from "./styles";

interface SignInStateProps {
    readonly signInError?: string;
}

interface SignInDispatchProps {
    readonly signIn: (username: string, password: string) => void;
}

export type SignInProps = SignInDispatchProps & SignInStateProps;

class SignIn extends React.Component<SignInProps> {
    render() {
        return <View>
        </View>;
    }
}

const mapStateToProps = (state: AppState): SignInStateProps => {
    return {
        signInError: state.signInError
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SignInDispatchProps => {
    return {
        signIn: (username, password) => {
            dispatch(SignInWithPassword(username, password));
        }
    };
}

export const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);