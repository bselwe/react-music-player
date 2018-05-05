import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { SelectAlbum, FetchAlbums } from "./reducers";
import AlbumItem from "../../Components/AlbumItem"
import * as routes from "../../Infrastructure/Navigation/AlbumsNavigation";
import Tidal from "../../Services/TidalClient";

interface AlbumsScreenStateProps {
    albums: Album[];
}

interface AlbumsScreenDispatchProps {
    fetchAlbums: (query?: string) => void;
    navigateToAlbum: (albumId: number) => void;
}

type AlbumsScreenProps = AlbumsScreenStateProps & AlbumsScreenDispatchProps; // & NavigationScreenProps;

class AlbumsScreen extends Component<AlbumsScreenProps> {
    static navigationOptions = {
        title: "Albums",
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAlbums();
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
                onChangeText={(text) => this.props.fetchAlbums(text)}  />
            <FlatList
                data={this.props.albums}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Album }) =>
                    <AlbumItem
                        name={item.title}
                        artist={item.artist.name}
                        image={Tidal.albumArtToUrl(item.cover).md}
                        onPress={() => this.props.navigateToAlbum(item.id)} />}
            />
        </View>
    }
}

const mapStateToProps = ({ app }): AlbumsScreenStateProps => {
    return {
        albums: app.albums
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): AlbumsScreenDispatchProps => {
    return {
        fetchAlbums: (query?: string) => {
            dispatch(FetchAlbums(query));
        },
        navigateToAlbum: (albumId: number) => {
            dispatch(SelectAlbum(albumId));
            dispatch(NavigationActions.navigate({ routeName: routes.Album }));
        }
    }
}

const AlbumsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumsScreen);

export default AlbumsScreenContainer;