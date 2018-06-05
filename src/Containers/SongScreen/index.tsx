import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid } from "react-native";
import FavoriteButton from "../../Components/FavoriteButton"
import EntypoIcon from "react-native-vector-icons/Entypo";
import VolumeIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as Progress from "react-native-progress";
import { connect, Dispatch } from "react-redux";
import { styles } from "./styles";
import { ToggleSong } from "./reducers";
import Tidal from "../../Services/TidalClient";
import { UpdateSongTime, UpdateSongPaused, UpdateSongMuted, UpdateSongVolume } from "../NowPlayingBar/reducers";
import { SelectPrevSong, SelectNextSong } from "../SongsScreen/reducers"
import * as moment from "moment";
import "moment-duration-format";
import Toolbar from "../../Infrastructure/Navigation/Toolbar";

interface SongScreenStateProps {
    song: CurrentTrack;
}

interface SongScreenDispatchProps {
    toggleSong: (displayed: boolean) => void;
    updateSongTime: (time: number) => void;
    updateSongPaused: (paused: boolean) => void;
    updateSongMuted: (muted: boolean) => void;
    updateSongVolume: (volume: number) => void;
    selectPrevSong: (fromAlbum: boolean) => void;
    selectNextSong: (fromAlbum: boolean) => void;
}

type SongScreenProps = SongScreenStateProps & SongScreenDispatchProps;

class SongScreen extends React.Component<SongScreenProps> {
    componentWillMount() {
        this.props.toggleSong(true);
    }

    componentWillUnmount() {
        this.props.toggleSong(false);
    }

    render() {
        return <View style={styles.container}>
            <Toolbar title={this.props.song.title} />
            <Image
                source={{ uri: Tidal.albumArtToUrl(this.props.song.album.cover).lg }}
                style={styles.image} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.song.title}</Text>
                <FavoriteButton onPress={() => {}}/>
            </View>
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
                <TouchableOpacity onPress={() => this.props.selectPrevSong(false)}>
                    <EntypoIcon name="controller-fast-backward" style={styles.iconFastForwardBackword} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.updateSongPaused(!this.props.song.paused)}>
                    <EntypoIcon name={`controller-${this.props.song.paused ? 'play' : 'paus'}`} style={styles.iconControllerPlayPause} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.selectNextSong(false)}>
                    <EntypoIcon name="controller-fast-forward" style={styles.iconFastForwardBackword} />
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

const mapStateToProps = (state: AppState): SongScreenStateProps => {
    return {
        song: state.currentSong
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SongScreenDispatchProps => {
    return {
        toggleSong: (displayed: boolean) => dispatch(ToggleSong(displayed)),
        updateSongTime: (time: number) => dispatch(UpdateSongTime(time)),
        updateSongPaused: (paused: boolean) => dispatch(UpdateSongPaused(paused)),
        updateSongMuted: (muted: boolean) => dispatch(UpdateSongMuted(muted)),
        updateSongVolume: (volume: number) => dispatch(UpdateSongVolume(volume)),
        selectPrevSong: (fromAlbum: boolean) => dispatch(SelectPrevSong()),
        selectNextSong: (fromAlbum: boolean) => dispatch(SelectNextSong())
    }
}

const SongScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongScreen);

export default SongScreenContainer;