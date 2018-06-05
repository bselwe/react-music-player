import React, { Component } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignUpWithPassword } from "./reducers";
import { styles } from "./styles";

interface SignUpState {
    name: string,
    lastname: string,
    email: string,
    password: string
}
interface SignUpStateProps {
    readonly signUpError?: string;
}

interface SignUpDispatchProps {
    readonly signUp: (name: string, lastname: string, email: string, password: string) => void;
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
        return <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
<<<<<<< HEAD
=======
            <TextInput
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                placeholder="Name"
            />
            <TextInput
                onChangeText={lastname => this.setState({ lastname })}
                value={this.state.lastname}
                placeholder="Last name"
            />
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
            <Text>{this.props.signUpError}</Text>
>>>>>>> Fix SignUp screen
            <View>
                <TouchableHighlight style={styles.button} onPress={() => this.onSignUpPress()} underlayColor='#FFC570'>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableHighlight>
            </View>
        </View>;
    }
}

const mapStateToProps = (state: AppState): SignUpStateProps => {
    return {
        signUpError: state.signUpError
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SignUpDispatchProps => {
    return {
        signUp: (name, lastname, email, password) => {
            dispatch(SignUpWithPassword(name, lastname, email, password));
        }
    };
}

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

export default SignUpContainer;