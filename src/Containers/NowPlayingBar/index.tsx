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
import { UpdateSongTime, UpdateSongPaused } from "./reducers";

interface NowPlayingBarStateProps {
    song: CurrentTrack;
    songDisplayed: boolean;
}

interface NowPlayingBarDispatchProps {
    navigateToSong: (songId: number) => void;
    updateSongTime: (time: number) => void;
    updateSongPaused: (paused: boolean) => void;
}

type NowPlayingBarProps = NowPlayingBarStateProps & NowPlayingBarDispatchProps;

class NowPlayingBar extends React.Component<NowPlayingBarProps> {
    constructor(props) {
        super(props);
    }

    onPlayProgress = ({ currentTime }) => {
        this.props.updateSongTime(currentTime);
    }

    onPlayEnd = () => {
        this.props.updateSongPaused(true);
    }

    render() {
        return this.props.song ? <View>
            {this.props.song.stream && <Video source={{uri: this.props.song.stream }}
                ref="audio"
                volume={this.props.song.volume}
                muted={this.props.song.muted}
                paused={this.props.song.paused}
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
                    width={null}
                    progress={this.props.song.time / this.props.song.duration}
                    borderColor="grey"
                    unfilledColor="grey"
                    color="#ffb74d" />
                <Text style={styles.name}>{this.props.song.title}</Text>
                <Text style={styles.artist}>{this.props.song.artist.name}</Text>
                <PlayIcon
                    style={styles.play} 
                    size={36} 
                    name={`${this.props.song.paused ? 'play' : 'pause'}-circle-outline`}
                    onPress={() => this.props.updateSongPaused(!this.props.song.paused)} />
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
        navigateToSong: (songId: number) => {
            dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        },
        updateSongTime: (time: number) => {
            dispatch(UpdateSongTime(time));
        },
        updateSongPaused: (paused: boolean) => {
            dispatch(UpdateSongPaused(paused));
        }
    }
}

const NowPlayingBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NowPlayingBar);

export default NowPlayingBarContainer;