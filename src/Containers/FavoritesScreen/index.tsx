import React, { Component } from "react";
import { View, Text, Button, FlatList, ScrollView } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { FetchFavorites } from "./reducers";
import SongItem from "../../Components/SongItem"
import Tidal from "../../Services/TidalClient";
import { SelectSong } from "../SongsScreen/reducers";

interface FavoritesScreenStateProps {
    favorites: Models.TrackDTO[];
}

interface FavoritesScreenDispatchProps {
    fetchFavorites: () => void;
    navigateToSong: (songId: number) => void;
}

type FavoritesScreenProps = FavoritesScreenStateProps & FavoritesScreenDispatchProps; // & NavigationScreenProps;

class FavoritesScreen extends Component<FavoritesScreenProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchFavorites();
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
            <FlatList
                data={this.props.favorites}
                keyExtractor={(item, index) => item.Id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Models.TrackDTO }) =>
                    <SongItem
                        name={item.Title}
                        artist={item.Artist}
                        image={Tidal.albumArtToUrl(item.Photo).md}
                        onPress={() => this.props.navigateToSong(item.Id)} />}
            />
        </ScrollView>
    }
}

const mapStateToProps = (state: AppState): FavoritesScreenStateProps => {
    return {
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): FavoritesScreenDispatchProps => {
    return {
        fetchFavorites: () => {
            dispatch(FetchFavorites());
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