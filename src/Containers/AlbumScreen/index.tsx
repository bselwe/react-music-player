import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid, FlatList, ScrollView, SectionList } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { connect, Dispatch } from "react-redux";
import { styles } from "./styles";
import AlbumSongItem from "../../Components/AlbumSongItem"
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SelectSong } from "../SongsScreen/reducers";
import Tidal from "../../Services/TidalClient";
import { FetchAlbumSongs } from "../AlbumsScreen/reducers";
import Toolbar from "../../Infrastructure/Navigation/Toolbar";

interface AlbumScreenStateProps {
    album: Album;
    albumSongs: Track[];
}

interface AlbumScreenDispatchProps {
    fetchAlbumSongs: (albumId: number) => void;
    navigateToSong: (songId: number, albumId: number) => void;
}

type AlbumScreenProps = AlbumScreenStateProps & AlbumScreenDispatchProps; // & NavigationScreenProps;

class AlbumScreen extends Component<AlbumScreenProps> {
    componentDidMount() {
        if (this.props.album != undefined)
            this.props.fetchAlbumSongs(this.props.album.id);
    }

    componentWillReceiveProps(props: AlbumScreenProps) {
        if (this.props.albumSongs.length == 0 && props.album !== undefined)
            this.props.fetchAlbumSongs(props.album.id);
    }

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
        return this.props.album !== undefined ? <View style={{ flex: 1 }}>
            <Toolbar title={this.props.album.title} />
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: Tidal.albumArtToUrl(this.props.album.cover).lg }}
                    style={styles.image} />
                <Text style={styles.title}>{this.props.album.title}</Text>
                <Text style={styles.subtitle}>{this.props.album.artist !== undefined ? this.props.album.artist.name : ""}</Text>
                <View style={styles.listContainer}>
                    {this.props.albumSongs.map(song => <View key={song.id}>
                        {this.renderSeparator()}
                        <AlbumSongItem
                            id={i++}
                            name={song.title}
                            onPress={() => this.props.navigateToSong(song.id, this.props.album.id)} /></View>)}
                </View>
            </ScrollView>
        </View> : null;
    }
}

const mapStateToProps = (state: AppState): AlbumScreenStateProps => {
    return {
        album: state.currentAlbum,
        albumSongs: state.currentAlbum !== undefined && state.currentAlbum.id in state.albumsSongs ? state.albumsSongs[state.currentAlbum.id] : []
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): AlbumScreenDispatchProps => {
    return {
        fetchAlbumSongs: (albumId: number) => {
            dispatch(FetchAlbumSongs(albumId));
        },
        navigateToSong: (songId: number, albumId: number) => {
            dispatch(SelectSong(songId, albumId));
        }
    }
}

const AlbumScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumScreen);

export default AlbumScreenContainer;