import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";

interface SongScreenStateProps {
    song: Song;
}

class SongScreen extends Component<SongScreenStateProps> {
    static navigationOptions = {
        title: "Song",
    };

    render() {
        return <View>
            <Image
                source={{ uri: this.props.song.image }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.song.name}</Text>
        </View>;
    }
}

const mapStateToProps = ({ app }): SongScreenStateProps => {
    return {
        song: app.currentSong
    }
}

const SongScreenContainer = connect(
    mapStateToProps,
    undefined
)(SongScreen);

export default SongScreenContainer;