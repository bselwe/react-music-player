import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, ToastAndroid } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

interface FavoriteButtonProps {
    isSelected: boolean;
    onSelected: (isSelected: boolean) => void;
}

export default class FavoriteButton extends Component<FavoriteButtonProps> {
    onPress() {
        let isSelected = !this.props.isSelected;
        if (isSelected)
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
        this.props.onSelected( isSelected );
    }

    render() {
        var style = this.props.isSelected ? styles.iconFavoriteSelected : styles.iconFavoriteUnselected;
        var name = this.props.isSelected ? "star" : "star-o";
        return <TouchableOpacity>
            <FontAwesome name={name} style={style} onPress={() => this.onPress()} />
        </TouchableOpacity>
    }
}