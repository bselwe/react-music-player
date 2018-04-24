import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface SongItemAlbumScreenProps {
    name: string;
    onPress: () => void;
}

export default class SongItemAlbumScreen extends Component<SongItemAlbumScreenProps> {
    render() {
        return <TouchableWithoutFeedback 
            onPress={this.props.onPress}
            style={styles.container}>
            <View>
                <Text style={styles.name}>{this.props.name}</Text>
            </View>
        {/* <Text style={styles.id}>{this.props.id}</Text> */}
        </TouchableWithoutFeedback>;
    }
}