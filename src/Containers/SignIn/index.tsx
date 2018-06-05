import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-native";
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, TextInput } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignInWithPassword } from "./reducers";
import { styles } from "./styles";
import * as routes from "../../Infrastructure/Navigation/Routes";

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
            email: "",
            password: ""
        }
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
            ownProps.history.replace(routes.SignUp);
        }
    };
}

const SignInContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn));

export default SignInContainer;