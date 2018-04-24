import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface AlbumItemArtistScreenProps {
    name: string;
    image: string;
    onPress: () => void;
}

export default class AlbumItemArtistScreen extends Component<AlbumItemArtistScreenProps> {
    render() {
        return <TouchableWithoutFeedback 
            onPress={this.props.onPress}
            style={styles.container}>
            <ImageBackground
                source={{ uri: this.props.image }}
                style={styles.albumCover}>
                <ImageBackground
                source={undefined}
                style={styles.shader}>
                    <Text style={styles.name}>{this.props.name}</Text>>
                </ImageBackground>
            </ImageBackground>
        </TouchableWithoutFeedback>;
    }
}