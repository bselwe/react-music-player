import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, Image, ImageBackground } from "react-native";
import { styles } from "./styles";

interface ArtistAlbumItemProps {
    name: string;
    image: string;
    onPress: () => void;
}

export default class ArtistAlbumItem extends Component<ArtistAlbumItemProps> {
    render() {
        return <TouchableNativeFeedback 
        onPress={this.props.onPress}
        style={styles.container}>
       
          
            <ImageBackground  source={{ uri: this.props.image }} 
            style={styles.albumCover}>
                <ImageBackground
                source={undefined}
                style={styles.shader}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    
                </ImageBackground>
             </ImageBackground>
            
        
        </TouchableNativeFeedback>;
    }
}