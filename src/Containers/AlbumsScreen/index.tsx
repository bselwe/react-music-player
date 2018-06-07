import React, { Component } from "react";
import { View, Text, Button, FlatList, ScrollView } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { withRouter, RouteComponentProps } from "react-router-native";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { SelectAlbum, FetchAlbums } from "./reducers";
import AlbumItem from "../../Components/AlbumItem"
import Tidal from "../../Services/TidalClient";
import * as routes from "../../Infrastructure/Navigation/Routes";
import SettingsBar from "../SettingsBar";

interface AlbumsScreenStateProps {
    albums: Album[];
}

interface AlbumsScreenDispatchProps {
    fetchAlbums: (query?: string) => void;
    navigateToAlbum: (albumId: number) => void;
}

type AlbumsScreenProps = AlbumsScreenStateProps & AlbumsScreenDispatchProps & RouteComponentProps<any>;

class AlbumsScreen extends Component<AlbumsScreenProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAlbums();
    }

    getAlbumImage(picture: string) {
        if(picture==undefined || picture.length==0)
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEW1tbX///+2trbR0dGvr6/MzMyysrL7+/v19fWkpKSoqKienp69vb3BwcHi4uLX19fs7OyUlJSLi4vn5+eHh4eampqSkpLHx8f29vbb29vU1NQBbJK+AAADJElEQVR4nO3c21bqMBSF4SSE9EipIFR5/wfdLQe3Cu2Va63OjPnfOOpN+EZ6IAF1IfdccHlHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U/n3pmt546sLdfmrQG1BbmC5+6hjVRlQXbq7CMnuh36mNaCXs1CbRSqg3iWbCUuuBYSb0nRLRTugvOpeiodBfVGbRUug/NYimQpVr0VboeyduNBb6opUmWgt9MQgTzYXeb2WJKxAKE+2EH/+JoieqnXAI3243giPaCbd10389NAQn0VAYQ7N9HGzkiJZCF+r2cVFmKnQhPi5GuQWxrXA8vs+i3Jtwa6GLt+3FspYa0VzoUnk9zFl4+43Ygt9e6FLuc+hin7swddNhI/U61iIsTrkLuypj4fU6HOqchcV4JHaSrkE4vW/r3zIWpmkJ1YqdpGsQHsc7qdwUrkDoxsvwIvY0XIHwepI2me5i3H7z4f1e8CS1F46L/OMhz93Eh7A6vUfJ12AudCEF0ZdgL5SOwr8uV+H9+5Zx/JGlMLnhsy/H+m7rMhSm0BX+q6LMTTj6/OsyEaahmAFmIkzbOZ/3Qw7CNMwD/S6Hb+61C0C1L5hKClO/JBQb9leSwt0S0MvtzPxMUDhtwCwkuer9nqRw9kEx1QluzfxIULh4n/G11pf1BYWLl2F31lrTCArDAvDjnMPfW8RyXtiIfdT0lOSd5jIPlPsg5inRJ/7MzbR/07qPTokKX99NN+96p6iTfucdnmfxWB1Et0efEl49Vb/Wv109TqDu3pfwCjg01f4xj8Vxd1D3ye9ihNScq9i2ITaHwymq+zR2okJIsa6qOqZg4FPaLw3X5Md5Pbjynrd+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOIX7v+0IuP+AeAhGRGRvocjAAAAAElFTkSuQmCC";
        return Tidal.albumArtToUrl(picture).md;
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
        let albums = this.props.albums.sort((a, b) => a.title < b.title ? -1 : 1);

        return <ScrollView>
            <SettingsBar onChangeText={(text) => this.props.fetchAlbums(text)}/>
            <FlatList
                data={albums}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Album }) =>
                    <AlbumItem
                        name={item.title}
                        artist={item.artist !== undefined ? item.artist.name : ""}
                        image={this.getAlbumImage(item.cover)}
                        onPress={() => this.props.navigateToAlbum(item.id)} />}
            />
        </ScrollView>
    }
}

const mapStateToProps = (state: AppState): AlbumsScreenStateProps => {
    return {
        albums: state.albums
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: RouteComponentProps<any>): AlbumsScreenDispatchProps => {
    return {
        fetchAlbums: (query?: string) => {
            dispatch(FetchAlbums(query));
        },
        navigateToAlbum: (albumId: number) => {
            dispatch(SelectAlbum(albumId));
            ownProps.history.push(routes.Album);
        }
    }
}

const AlbumsScreenContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumsScreen));

export default AlbumsScreenContainer;