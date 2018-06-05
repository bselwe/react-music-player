import { connect } from 'react-redux';
import React from "react";
import { Route, RouteComponentProps, RouteProps, Redirect } from "react-router-native";
import * as routes from "./Routes";

interface PrivateRouteProps extends RouteProps {
    isSignedIn?: boolean;
}

class PrivateRoute extends React.Component<PrivateRouteProps> {
    render() {
        let { component: Component, isSignedIn, ...rest } = this.props;

        console.log("Is signed in: " + isSignedIn);

        return <Route {...rest} render={props => (
            isSignedIn ? <Component {...props} /> :
            <Redirect to={{ pathname: routes.SignIn, state: { from: props.location } }} />
        )}/>
    }
}

const PrivateRouteContainer = connect(
    (state: AppState): PrivateRouteProps => ({
        isSignedIn: state.isSignedIn
    }),
    undefined
)(PrivateRoute);

export default PrivateRouteContainer;