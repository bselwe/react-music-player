import React, { Component } from "react";
import { View, Text, Button, FlatList, ScrollView } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { SelectSong, FetchSongs } from "./reducers";
import SongItem from "../../Components/SongItem"
import Tidal from "../../Services/TidalClient";

interface FavoritesScreenStateProps {
    songs: Track[];
}

interface FavoritesScreenDispatchProps {
    fetchSongs: (query?: string) => void;
    navigateToSong: (songId: number) => void;
}

type FavoritesScreenProps = FavoritesScreenStateProps & FavoritesScreenDispatchProps; // & NavigationScreenProps;

class FavoritesScreen extends Component<FavoritesScreenProps> {
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
        return <ScrollView>
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
                        image={Tidal.albumArtToUrl(item.album.cover).md}
                        onPress={() => this.props.navigateToSong(item.id)} />}
            />
        </ScrollView>
    }
}

const mapStateToProps = (state: AppState): FavoritesScreenStateProps => {
    return {
        songs: state.songs
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): FavoritesScreenDispatchProps => {
    return {
        fetchSongs: (query?: string) => {
            dispatch(FetchSongs(query));
        },
        navigateToSong: (songId: number) => {
            dispatch(SelectSong(songId, undefined));
        }
    }
}

const FavoritesScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesScreen);

export default FavoritesScreenContainer;