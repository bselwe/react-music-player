import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface SongItemProps {
    name: string;
    artist: string;
    image: string;
    onPress: () => void;
}

export default class SongItem extends Component<SongItemProps> {
    render() {
        return <TouchableOpacity onPress={this.props.onPress}>
            <ImageBackground
                source={{ uri: this.props.image }}
                style={styles.albumCover}>
                <ImageBackground
                source={undefined}
                style={styles.shader}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.artist}>{this.props.artist}</Text>
                </ImageBackground>
            </ImageBackground>
        </TouchableOpacity>;
    }
}