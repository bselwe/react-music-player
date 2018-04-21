import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface ArtistItemProps {
    name: string;
    image: string;
    onPress: () => void;
}

export default class ArtistItem extends Component<ArtistItemProps> {
    render() {
        return <TouchableOpacity 
            onPress={this.props.onPress}
            style={styles.container}>
            <ImageBackground
                source={{ uri: this.props.image }}
                style={styles.albumCover}>
                <ImageBackground
                source={undefined}
                style={styles.shader}>
                    <Text style={styles.name}>{this.props.name}</Text>
                </ImageBackground>
            </ImageBackground>
        </TouchableOpacity>;
    }
}