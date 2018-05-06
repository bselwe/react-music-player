import React, { Component } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import SongItem from "../../Components/SongItem"
import * as routes from "../../Infrastructure/Navigation/SongsNavigation";
import { styles } from "./styles";
import * as Progress from "react-native-progress";
import PlayIcon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import { FetchSongStream } from "../SongScreen/reducers";

interface NowPlayingBarStateProps {
    song: Track & { stream: string };
    songDisplayed: boolean;
}

interface NowPlayingBarDispatchProps {
    fetchSongStream: (songId: number) => void;
    navigateToSong: (songId: number) => void;
}

type NowPlayingBarProps = NowPlayingBarStateProps & NowPlayingBarDispatchProps;

class NowPlayingBar extends React.Component<NowPlayingBarProps> {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props: NowPlayingBarProps) {
        if (this.props.song === undefined || props.song.stream != this.props.song.stream)
            this.props.fetchSongStream(props.song.id);
    }

    onPlayProgress = ({ currentTime }) => {
        console.log(currentTime);
    }

    onPlayEnd = () => {
    }

    render() {
        return this.props.song ? <View>
            {this.props.song.stream && <Video source={{uri: this.props.song.stream }}
                ref="audio"
                volume={1.0}
                muted={false}
                paused={false}
                playInBackground={true}
                playWhenInactive={true}
                onProgress={this.onPlayProgress}
                onEnd={this.onPlayEnd}
                resizeMode="cover"
                repeat={false}/>}

            {!this.props.songDisplayed && <TouchableOpacity 
                style={styles.container}
                onPress={() => this.props.navigateToSong(this.props.song.id)}>

                <Progress.Bar 
                    style={styles.progress}
                    progress={0.4}
                    borderColor="grey"
                    unfilledColor="grey"
                    color="#ffb74d" />
                <Text style={styles.name}>{this.props.song.title}</Text>
                <Text style={styles.artist}>{this.props.song.artist.name}</Text>
                <PlayIcon style={styles.play} size={36} name="play-circle-outline" />
                </TouchableOpacity>}
        </View> : null;
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
        fetchSongStream: (songId: number) => {
            dispatch(FetchSongStream(songId));
        },
        navigateToSong: (songId: number) => {
            dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        }
    }
}

const NowPlayingBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NowPlayingBar);

export default NowPlayingBarContainer;