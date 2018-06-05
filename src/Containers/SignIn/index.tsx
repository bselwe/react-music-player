import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-native";
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignInWithPassword } from "./reducers";
import { styles } from "./styles";
import * as routes from "../../Infrastructure/Navigation/Routes";
import { tokenStorage } from "../../Services/TokenStorage";
import { loginManager } from "../../Services/LoginManager";

// var options = {
//     fields: {
//         password: {
//             secureTextEntry: true
//         }
//     },
//     auto: 'placeholders',
// };

interface SignInState {
    email: string,
    password: string
}

interface SignInStateProps {
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
            email: "bselwesiuk@gmail.com",
            password: "a"
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("token").then(halo => console.log(halo));
        AsyncStorage.getItem("refresh_token").then(halo => console.log(halo));
        AsyncStorage.getItem("expiration_date").then(halo => console.log(halo));
    }

    onSignInPress() {
        this.props.signIn(this.state.email, this.state.password);
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholder="Email"
            />
            <TextInput
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholder="Password"
            />
            <Text>{this.props.signInError}</Text>
            <View>
                <TouchableHighlight style={styles.button} onPress={() => this.onSignInPress()} underlayColor='#FFC570'>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableOpacity onPress={() => this.props.navigateToSignUp()}>
                    <View>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

const mapStateToProps = (state: AppState): SignInStateProps => {
    return {
        signInError: state.signInError
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: SignInProps): SignInDispatchProps => {
    return {
        signIn: (username, password) => {
            dispatch(SignInWithPassword(username, password));
        },
        navigateToSignUp: () => {
            console.log(ownProps.history);
            ownProps.history.push(routes.SignUp);
        }
    };
}

const SignInContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn));

export default SignInContainer;