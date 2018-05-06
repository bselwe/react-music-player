import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { connect, Dispatch } from "react-redux";
import { styles } from "./styles";
import { ToggleSong, FetchSongStream } from "./reducers";
import Video from "react-native-video";
import Tidal from "../../Services/TidalClient";

interface SongScreenStateProps {
    song: Track & { stream: string };
}

interface SongScreenDispatchProps {
    fetchSongStream: (songId: number) => void;
    toggleSong: (displayed: boolean) => void;
}

type SongScreenProps = SongScreenStateProps & SongScreenDispatchProps;

class SongScreen extends React.Component<SongScreenProps> {
    static navigationOptions = {
        title: "Song",
    };

    componentDidMount() {
        this.props.fetchSongStream(this.props.song.id);
    }

    componentWillMount() {
        this.props.toggleSong(true);
    }

    componentWillUnmount() {
        this.props.toggleSong(false);
    }

    // onPlayProgress = ({ currentTime }) => {
    //     console.log(currentTime);
    // }

    // onPlayEnd = () => {
    // }

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
                    progress={0.4}
                    borderColor="grey"
                    unfilledColor="grey"
                    color="#ffb74d" />
                <View style={styles.time}>
                    <Text style={styles.time}>0:00</Text>
                    <Text style={styles.time}>-3:46</Text>
                </View>
            </View>
            <View style={styles.controlls}>
                <TouchableOpacity>
                    <EntypoIcon name="controller-fast-backward" style={styles.iconFastForwardBackword}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <EntypoIcon name="controller-play" style={styles.iconControllerPlay}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <EntypoIcon name="controller-fast-forward" style={styles.iconFastForwardBackword}/>
                </TouchableOpacity>
            </View>
            <View style={styles.sound}>
                <Slider 
                    step={1}
                    maximumValue={100}
                    value={60}
                    thumbTintColor={"#ffb74d"}
                    minimumTrackTintColor={"grey"} />
                <FontAwesomeIcon name="volume-up" style={styles.iconSound}/>
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
        fetchSongStream: (songId: number) => {
            dispatch(FetchSongStream(songId));
        },
        toggleSong: (displayed: boolean) => {
            dispatch(ToggleSong(displayed));
        }
    }
}

const SongScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongScreen);

export default SongScreenContainer;