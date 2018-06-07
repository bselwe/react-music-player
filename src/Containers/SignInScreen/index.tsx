import React, { Component } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-native";
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignInWithPassword } from "./reducers";
import { styles } from "./styles";
import * as routes from "../../Infrastructure/Navigation/Routes";
import { tokenStorage } from "../../Services/TokenStorage";
import { loginManager } from "../../Services/LoginManager";
import SongsScreen from "../SongsScreen";

interface SignInState {
    email: string,
    password: string
}

interface SignInStateProps {
    isSignedIn: boolean;
    signInError?: string;
}

interface SignInDispatchProps {
    signIn: (username: string, password: string) => void;
    navigateToSignUp: () => void;
}

export type SignInProps = SignInDispatchProps & SignInStateProps & RouteComponentProps<any>;

class SignIn extends React.Component<SignInProps, SignInState> {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    onSignInPress() {
        this.props.signIn(this.state.email, this.state.password);
    }

    render() {
        // const { from } = this.props.location.state || { from: { pathname: routes.Songs } };

        return !this.props.isSignedIn ? <View style={styles.container}>
            <View style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.2, backgroundColor: "white" }} pointerEvents="none">
                <SongsScreen />
            </View>

            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholder="Email"
            />
            <TextInput style={styles.input}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Text>{this.props.signInError}</Text>
            <View>
                <TouchableHighlight style={styles.button} onPress={() => this.onSignInPress()} underlayColor='#FFC570'>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableOpacity onPress={() => this.props.navigateToSignUp()}>
                    <View>
                        <Text style={styles.buttonText}>Go to Sign up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View> : <Redirect to={routes.AfterSignIn} />;
    }
}

const mapStateToProps = (state: AppState): SignInStateProps => {
    return {
        isSignedIn: state.isSignedIn,
        signInError: state.signInError
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: SignInProps): SignInDispatchProps => {
    return {
        signIn: (username, password) => {
            dispatch(SignInWithPassword(username, password));
        },
        navigateToSignUp: () => {
            ownProps.history.replace(routes.SignUp);
        }
    };
}

const SignInContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn));

export default SignInContainer;