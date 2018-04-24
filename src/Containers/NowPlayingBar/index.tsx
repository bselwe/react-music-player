import React, { Component } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import SongItem from "../../Components/SongItem"
import * as routes from "../../Infrastructure/Navigation/SongsNavigation";
import { styles } from "./styles";
import * as Progress from "react-native-progress";
import PlayIcon from "react-native-vector-icons/MaterialIcons";

interface NowPlayingBarStateProps {
    song: Song;
    songDisplayed: boolean;
}

interface NowPlayingBarDispatchProps {
    navigateToSong: (songId: string) => void;
}

type NowPlayingBarProps = NowPlayingBarStateProps & NowPlayingBarDispatchProps;

class NowPlayingBar extends React.Component<NowPlayingBarProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.song && !this.props.songDisplayed ? <TouchableOpacity 
            style={styles.container}
            onPress={() => this.props.navigateToSong(this.props.song.id)}>
            <Progress.Bar 
                style={styles.progress}
                progress={0.4}
                borderColor="grey"
                unfilledColor="grey"
                color="#ffb74d" />
            <Text style={styles.name}>{this.props.song.name}</Text>
            <Text style={styles.artist}>{this.props.song.artist}</Text>
            <PlayIcon style={styles.play} size={36} name="play-circle-outline" />
        </TouchableOpacity> : null;
    }
}

const mapStateToProps = ({ app }): NowPlayingBarStateProps => {
    return {
        song: app.currentSong,
        songDisplayed: app.songDisplayed
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): NowPlayingBarDispatchProps => {
    return {
        navigateToSong: (songId: string) => {
            dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        }
    }
}

const NowPlayingBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NowPlayingBar);

export default NowPlayingBarContainer;