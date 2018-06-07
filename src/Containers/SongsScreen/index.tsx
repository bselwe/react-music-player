import React, { Component } from "react";
import { View, Text, Button, FlatList, ScrollView } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import { SelectSong, FetchSongs } from "./reducers";
import SettingsBar from "../SettingsBar";
import SongItem from "../../Components/SongItem";
import Tidal from "../../Services/TidalClient";

interface SongsScreenStateProps {
    songs: Track[];
}

interface SongsScreenDispatchProps {
    fetchSongs: (query?: string) => void;
    navigateToSong: (songId: number) => void;
}

type SongsScreenProps = SongsScreenStateProps & SongsScreenDispatchProps; // & NavigationScreenProps;

class SongsScreen extends Component<SongsScreenProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSongs();
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
        let songs = this.props.songs.sort((a, b) => a.title < b.title ? -1 : 1);

        return <ScrollView>
            <SettingsBar onChangeText={(text) => this.props.fetchSongs(text)}/>
            <FlatList
                data={songs}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Track }) =>
                    <SongItem
                        name={item.title}
                        artist={item.artist.name}
                        image={Tidal.albumArtToUrl(item.album.cover).md}
                        onPress={() => this.props.navigateToSong(item.id)} />}
            />
        </ScrollView>
    }
}

const mapStateToProps = (state: AppState): SongsScreenStateProps => {
    return {
        songs: state.songs
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SongsScreenDispatchProps => {
    return {
        fetchSongs: (query?: string) => {
            dispatch(FetchSongs(query));
        },
        navigateToSong: (songId: number) => {
            dispatch(SelectSong(songId, undefined));
        }
    }
}

const SongsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsScreen);

export default SongsScreenContainer;