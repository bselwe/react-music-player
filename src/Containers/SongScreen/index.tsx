import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
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
        return <View style={styles.container}>
            <Image
                source={{ uri: this.props.song.image }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.song.name}</Text>
            <Text style={styles.subtitle}>{this.props.song.artist} - {this.props.song.album}</Text>
            <View style={styles.controlls}>
                <EntypoIcon name="controller-fast-backward" style={styles.iconFastForwardBackword}/>
                <EntypoIcon name="controller-play" style={styles.iconControllerPlay}/>
                <EntypoIcon name="controller-fast-forward" style={styles.iconFastForwardBackword}/>
            </View>
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