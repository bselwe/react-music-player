import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationScreenProps } from "react-navigation";

export default class OtherScreen extends Component {
    static navigationOptions = {
        title: "Other",
    };

    render() {
        return <Text>Something</Text>
    }
}