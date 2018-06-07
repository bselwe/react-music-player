import React, { Component } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, TextInput } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignUpWithPassword } from "./reducers";
import { styles } from "./styles";
import { RouteComponentProps, withRouter } from "react-router-native";
import * as routes from "../../Infrastructure/Navigation/Routes";
import { Redirect } from "react-router-native";
import SongsScreen from "../SongsScreen";

interface SignUpState {
    name: string,
    lastname: string,
    email: string,
    password: string
}

interface SignUpStateProps {
    readonly signUpError?: string;
    readonly signUpResult?: boolean;
}

interface SignUpDispatchProps {
    readonly signUp: (name: string, lastname: string, email: string, password: string) => void;
    readonly navigateToSignIn: () => void;
}

export type SignUpProps = SignUpDispatchProps & SignUpStateProps;

class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lastname: "",
            email: "",
            password: ""
        }
    }

    onSignUpPress() {
        this.props.signUp(this.state.name, this.state.lastname, this.state.email, this.state.password);
    }

    render() {
        if (this.props.signUpResult !== undefined && this.props.signUpResult)
            return <Redirect to={routes.SignIn} />

        return <View style={styles.container}>
            <View style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.2, backgroundColor: "black" }} pointerEvents="none">
                <SongsScreen />
            </View>
            <Text style={styles.title}>Sign up</Text>
            <TextInput style={styles.input}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                placeholder="Name"
            />
            <TextInput style={styles.input}
                onChangeText={lastname => this.setState({ lastname })}
                value={this.state.lastname}
                placeholder="Last name"
            />
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
            <Text>{this.props.signUpError}</Text>
            <View>
                <TouchableHighlight style={styles.button} onPress={() => this.onSignUpPress()} underlayColor='#FFC570'>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableHighlight>
                <TouchableOpacity onPress={() => this.props.navigateToSignIn()}>
                    <View>
                        <Text style={styles.buttonTextSignUp}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

const mapStateToProps = (state: AppState): SignUpStateProps => {
    return {
        signUpError: state.signUpError,
        signUpResult: state.signUpResult
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: RouteComponentProps<any>): SignUpDispatchProps => {
    return {
        signUp: (name, lastname, email, password) => {
            dispatch(SignUpWithPassword(name, lastname, email, password));
        },
        navigateToSignIn: () => {
            ownProps.history.replace(routes.SignIn);
        }
    };
}

const SignUpContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp));

export default SignUpContainer;