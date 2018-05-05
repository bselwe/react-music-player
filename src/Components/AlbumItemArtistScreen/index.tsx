import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface AlbumItemArtistScreenProps {
    name: string;
    //image: string;
    onPress: () => void;
}

export default class AlbumItemArtistScreen extends Component<AlbumItemArtistScreenProps> {
    render() {
        return <TouchableNativeFeedback 
        onPress={this.props.onPress}
        style={styles.container}>
        <View>
            <Text style={styles.name}>{this.props.name}</Text>
        </View>
        </TouchableNativeFeedback>;
    }
}