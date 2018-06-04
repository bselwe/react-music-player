import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { connect, Dispatch } from "react-redux";
import { SignUpWithPassword } from "./reducers";
import { styles } from "./styles";
import t from 'tcomb-form-native';

// Form
const Form = t.form.Form;

// Form model
const signUpData = t.struct({
    name: t.String,
    lastname: t.String,
    email: t.String,
    password: t.String,
});

var options = {
    fields: {
      password: {
        secureTextEntry: true
      }
    },
    auto: 'placeholders'
  };

interface SignUpStateProps {
    readonly SignUpError?: string;
}

interface SignUpDispatchProps {
    readonly SignUp: (username: string, password: string) => void;
}

export type SignUpProps = SignUpDispatchProps & SignUpStateProps;

class SignUp extends React.Component<SignUpProps> {
    onPress() {
        console.log("Form submitted.");
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <Form ref="form" type={signUpData} options={options}/>
            <View>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#FFC570'>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableHighlight>
            </View>
        </View>;
    }
}

const mapStateToProps = (state: AppState): SignUpStateProps => {
    return {
        SignUpError: state.signUpError
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SignUpDispatchProps => {
    return {
        SignUp: (username, password) => {
            dispatch(SignUpWithPassword(username, password));
        }
    };
}

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

export default SignUpContainer;