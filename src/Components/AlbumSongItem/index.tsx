import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, TouchableNativeFeedback, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface AlbumSongItemProps {
    id: number;
    name: string;
    onPress: () => void;
}

export default class AlbumSongItem extends Component<AlbumSongItemProps> {
    render() {
        return <TouchableNativeFeedback 
            onPress={this.props.onPress}>
            <View style={styles.container}>
                <Text style={styles.id}>{this.props.id}</Text>
                <Text style={styles.name}>{this.props.name}</Text>
            </View>
        </TouchableNativeFeedback>;
    }
}