import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import { styles } from "./styles";

interface SongScreenStateProps {
    song: Artist;
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

const SongScreenContainer = connect(
    mapStateToProps,
    undefined
)(SongScreen);

export default SongScreenContainer;