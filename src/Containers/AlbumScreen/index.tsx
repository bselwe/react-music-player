import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid, FlatList, ScrollView, SectionList } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { connect, Dispatch } from "react-redux";
import { styles } from "./styles";
import AlbumSongItem from "../../Components/AlbumSongItem"
import * as routes from "../../Infrastructure/Navigation/SongsNavigation";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SelectSong } from "../SongsScreen/reducers";
import Tidal from "../../Services/TidalClient";

interface AlbumScreenStateProps {
    album: Album;
}

interface AlbumScreenDispatchProps {
    navigateToSong: (songId: number) => void;
}

type AlbumScreenProps = AlbumScreenStateProps & AlbumScreenDispatchProps; // & NavigationScreenProps;

class AlbumScreen extends Component<AlbumScreenProps> {
    static navigationOptions = {
        title: "Album",
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    render() {
        let i = 1;
        return <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: Tidal.albumArtToUrl(this.props.album.cover).lg }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.album.title}</Text>
            <Text style={styles.subtitle}>{this.props.album.artist.name}</Text>
            <View style={styles.listContainer}>
                {/* {this.props.album.songs.map(song => <View key={song.id}>
                    {this.renderSeparator()}
                    <AlbumSongItem
                        id={i++}
                        name={song.name}
                        onPress={() => this.props.navigateToSong(song.id)} /></View>)} */}
            </View>
        </ScrollView>;
    }
}

const mapStateToProps = ({ app }): AlbumScreenStateProps => {
    return {
        album: app.currentAlbum
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): AlbumScreenDispatchProps => {
    return {
        navigateToSong: (songId: number) => {
            dispatch(SelectSong(songId));
            //dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        }
    }
}

const AlbumScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumScreen);

export default AlbumScreenContainer;