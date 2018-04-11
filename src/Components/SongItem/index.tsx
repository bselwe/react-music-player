import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface SongItemProps {
    name: string;
    image: string;
    onPress: () => void;
}

export default class SongItem extends Component<SongItemProps> {
    render() {
        return <TouchableOpacity onPress={this.props.onPress}>
            <ImageBackground
                source={{ uri: this.props.image }}
                style={styles.image}>
                <Text style={styles.title}>
                    {this.props.name}
                </Text>
            </ImageBackground>
        </TouchableOpacity>;
    }
}