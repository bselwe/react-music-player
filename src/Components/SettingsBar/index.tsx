import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { SearchBar } from 'react-native-elements';
import { styles } from "./styles";

interface SettingsBarProps {
    onChangeText: (text) => void;
}

export default class SettingsBar extends Component<SettingsBarProps> {
    render() {
        return <View style={styles.container}>
            <SearchBar
                round
                containerStyle={{ flexGrow: 1, borderBottomWidth: 0, borderTopWidth: 0 }}
                placeholder='Search'
                onChangeText={this.props.onChangeText} />
            <View style={styles.containerLogout}>
                <TouchableOpacity style={{alignItems: "center"}}>
                    <MaterialCommunityIcons name="logout" style={styles.iconLogout} />
                    <Text style={styles.labelLogout}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}