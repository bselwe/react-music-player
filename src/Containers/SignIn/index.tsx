import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-native";
import { View, Text, TouchableHighlight } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignInWithPassword } from "./reducers";
import { styles } from "./styles";
import * as routes from "../../Infrastructure/Navigation/Routes";
import t from 'tcomb-form-native';

// Form
const Form = t.form.Form;

// Form model
const User = t.struct({
    email: t.String,
    password: t.String,
});

var options = {
    fields: {
        email: {
        label: 'User email' // <= label for the name field
      },
      password: {
        label: 'Password', // <= label for the name field
        secureTextEntry: true
      }
    },
    auto: 'placeholders'
  };

interface SignInStateProps {
    signInError?: string;
}

interface SignInDispatchProps {
    signIn: (username: string, password: string) => void;
    navigateToSignUp: () => void;
}

export type SignInProps = SignInDispatchProps & SignInStateProps & RouteComponentProps<any>;

class SignIn extends React.Component<SignInProps> {
    render() {
        return <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Form ref="form" type={User} options={options}/>
            <View>
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => this.props.navigateToSignUp()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Sign up</Text>
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