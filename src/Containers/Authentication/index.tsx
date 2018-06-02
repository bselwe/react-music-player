import * as React from "react";
import { connect } from "react-redux";
//import { SignIn } from "../SignIn/index";

interface AuthenticationProps {
    children?: React.ReactNode;
}

export const Authentication = connect(
    (state: AppState) => {
        return {
            isSignedIn: state.isSignedIn
        };
    }
)(props => props.isSignedIn ? <div>{props.children}</div> : <SignIn />);