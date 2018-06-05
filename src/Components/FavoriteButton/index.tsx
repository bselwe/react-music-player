import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, ToastAndroid } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

interface FavoriteButtonState {
    isSelected: boolean;
}

interface FavoriteButtonProps {
    onPress: () => void;
}

export default class FavoriteButton extends Component<FavoriteButtonProps, FavoriteButtonState> {
    constructor(props) {
        super(props)
        this.state = {
            //TODO: Fetch from database
            isSelected: false
        }
    }

    onPress() {
        this.setState({ isSelected: !this.state.isSelected });
        if (!this.state.isSelected)
            ToastAndroid.showWithGravity(
                'Track added to favorites',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        else
            ToastAndroid.showWithGravity(
                'Track removed from favorites',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
    }

    render() {
        var style = this.state.isSelected ? styles.iconFavoriteSelected : styles.iconFavoriteUnselected;
        var name = this.state.isSelected ? "star" : "star-o";
        return <TouchableOpacity>
            <FontAwesome name={name} style={style} onPress={() => this.onPress()} />
        </TouchableOpacity>
    }
}