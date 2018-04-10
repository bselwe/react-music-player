import React, { Component } from "react";
import { View, Text, Button } from "react-native";

interface HomeScreenState {
    counter: number;
}

export default class HomeScreen extends Component<{}, HomeScreenState> {
    static navigationOptions = {
        title: "Home",
    };

    constructor(props) {
        super(props);
        
        this.state = {
            counter: 0
        };
    }

    increment = () => {
        this.setState({ counter: this.state.counter + 1 });
    }

    render() {
        return <Button 
            onPress={this.increment}
            title={this.state.counter.toString()} />
    }
}