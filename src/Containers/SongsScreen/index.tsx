import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { SelectSong, FetchSongs } from "./reducers";
import SongItem from "../../Components/SongItem"
import * as routes from "../../Infrastructure/Navigation/SongsNavigation";
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
    static navigationOptions = {
        title: "Songs",
    };

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
        return <View>
            <SearchBar
                placeholder='Search'
                onChangeText={(text) => this.props.fetchSongs(text)} />
            <FlatList
                data={this.props.songs}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Track }) =>
                    <SongItem
                        name={item.title}
                        artist={item.artist.name}
                        image={Tidal.albumArtToUrl(item.album.cover).lg}
                        onPress={() => this.props.navigateToSong(item.id)} />}
            />
        </View>
    }
}

const mapStateToProps = ({ app }): SongsScreenStateProps => {
    return {
        songs: app.songs
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SongsScreenDispatchProps => {
    return {
        fetchSongs: (query?: string) => {
            dispatch(FetchSongs(query));
        },
        navigateToSong: (songId: number) => {
            dispatch(SelectSong(songId));
        }
    }
}

const SongsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsScreen);

export default SongsScreenContainer;