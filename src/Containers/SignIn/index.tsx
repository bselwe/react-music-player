import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignInWithPassword } from "./reducers";
import { styles } from "./styles";
import t from 'tcomb-form-native';

// Form
const Form = t.form.Form;

// Form model
const User = t.struct({
    username: t.String,
    password: t.String,
});

var options = {
    fields: {
      username: {
        label: 'User name' // <= label for the name field
      },
      password: {
        label: 'Password', // <= label for the name field
        secureTextEntry: true
      }
    },
    auto: 'placeholders'
  };

interface SignInStateProps {
    readonly signInError?: string;
}

interface SignInDispatchProps {
    readonly signIn: (username: string, password: string) => void;
}

export type SignInProps = SignInDispatchProps & SignInStateProps;

class SignIn extends React.Component<SignInProps> {
    onPress() {
        console.log("Form submitted.");
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Form ref="form" type={User} options={options}/>
            <View>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
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

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

export default SignInContainer;