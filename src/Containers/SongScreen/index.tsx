import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import VolumeIcon from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { connect, Dispatch } from "react-redux";
import { styles } from "./styles";
import { ToggleSong } from "./reducers";
import Tidal from "../../Services/TidalClient";
import { UpdateSongTime, UpdateSongPaused, UpdateSongMuted, UpdateSongVolume } from "../NowPlayingBar/reducers";
import * as moment from "moment";
import "moment-duration-format";

interface SongScreenStateProps {
    song: CurrentTrack;
}

interface SongScreenDispatchProps {
    toggleSong: (displayed: boolean) => void;
    updateSongTime: (time: number) => void;
    updateSongPaused: (paused: boolean) => void;
    updateSongMuted: (muted: boolean) => void;
    updateSongVolume: (volume: number) => void;
}

type SongScreenProps = SongScreenStateProps & SongScreenDispatchProps;

class SongScreen extends React.Component<SongScreenProps> {
    static navigationOptions = {
        title: "Song",
    };

    componentWillMount() {
        this.props.toggleSong(true);
    }

    componentWillUnmount() {
        this.props.toggleSong(false);
    }

    render() {
        return <View style={styles.container}>
            <Image
                source={{ uri: Tidal.albumArtToUrl(this.props.song.album.cover).lg }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.song.title}</Text>
            <Text style={styles.subtitle}>{this.props.song.artist.name} - {this.props.song.album.title}</Text>
            <View
                style={styles.progressContainer}>
                <Progress.Bar 
                    style={styles.progress}
                    width={null}
                    progress={this.props.song.time / this.props.song.duration}
                    borderColor="grey"
                    unfilledColor="grey"
                    color="#ffb74d" />
                <View style={styles.time}>
                    <Text style={styles.time}>{moment.duration(this.props.song.time, "seconds").format("m:ss", { trim: false })}</Text>
                    <Text style={styles.time}>{moment.duration(this.props.song.duration, "seconds").format("m:ss", { trim: false })}</Text>
                </View>
            </View>
            <View style={styles.controlls}>
                <TouchableOpacity>
                    <EntypoIcon name="controller-fast-backward" style={styles.iconFastForwardBackword}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.updateSongPaused(!this.props.song.paused)}>
                    <EntypoIcon name={`controller-${this.props.song.paused ? 'play' : 'paus'}`} style={styles.iconControllerPlayPause}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <EntypoIcon name="controller-fast-forward" style={styles.iconFastForwardBackword}/>
                </TouchableOpacity>
            </View>
            <View style={styles.sound}>
                <Slider 
                    step={0.01}
                    maximumValue={1}
                    onValueChange={volume => this.props.updateSongVolume(volume)}
                    value={this.props.song.volume}
                    thumbTintColor={"#ffb74d"}
                    minimumTrackTintColor={"grey"} />
                <VolumeIcon 
                    name={`md-volume-${this.props.song.muted ? 'off' : 'up'}`} 
                    style={styles.iconSound}
                    onPress={() => this.props.updateSongMuted(!this.props.song.muted)} />
            </View>
        </View>;
    }
}

const mapStateToProps = ({ app }): SongScreenStateProps => {
    return {
        song: app.currentSong
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SongScreenDispatchProps => {
    return {
        toggleSong: (displayed: boolean) => dispatch(ToggleSong(displayed)),
        updateSongTime: (time: number) => dispatch(UpdateSongTime(time)),
        updateSongPaused: (paused: boolean) => dispatch(UpdateSongPaused(paused)),
        updateSongMuted: (muted: boolean) => dispatch(UpdateSongMuted(muted)),
        updateSongVolume: (volume: number) => dispatch(UpdateSongVolume(volume))
    }
}

const SongScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongScreen);

export default SongScreenContainer;