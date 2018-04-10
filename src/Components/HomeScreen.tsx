import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as routes from "../Routes";

export default class HomeScreen extends Component<NavigationScreenProps> {
    static navigationOptions = {
        title: "Home",
    };

    constructor(props) {
        super(props);
        
        this.state = {
            counter: 0
        };
    }

    render() {
        return <Button 
            onPress={() => this.props.navigation.navigate(routes.Other)}
            title={"Navigate to other"} />
    }
}