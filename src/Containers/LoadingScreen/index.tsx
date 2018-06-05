import React, { Component } from "react";
import { View } from "react-native";
import { connect, Dispatch } from "react-redux";
import { FetchUserInfo } from "../SignInScreen/reducers";
import { Redirect } from "react-router-native";
import * as routes from "../../Infrastructure/Navigation/Routes";

interface LoadingScreenStateProps {
    isSignedIn?: boolean;
}
interface LoadingScreenDispatchProps {
    loadUserInfo: () => void;
}

type LoadingScreenProps = LoadingScreenStateProps & LoadingScreenDispatchProps;

class LoadingScreen extends Component<LoadingScreenProps> {
    componentDidMount() {
        this.props.loadUserInfo();
    }

    render() {
        return this.props.isSignedIn !== undefined ?
            this.props.isSignedIn ? <Redirect to={routes.Songs} /> : <Redirect to={routes.SignIn} /> 
            : null;
    }
}

const mapStateToProps = (state: AppState): LoadingScreenStateProps => {
    return {
        isSignedIn: state.isSignedIn
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): LoadingScreenDispatchProps => {
    return {
        loadUserInfo: () => {
            dispatch(FetchUserInfo());
        }
    }
}

const LoadingScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen);

export default LoadingScreenContainer;