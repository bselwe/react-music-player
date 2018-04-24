import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import { SelectAlbum } from "./reducers";
import AlbumItem from "../../Components/AlbumItem"
import * as routes from "../../Infrastructure/Navigation/AlbumsNavigation";

interface AlbumsScreenStateProps {
    albums: Album[];
}

interface AlbumsScreenDispatchProps {
    navigateToAlbum: (albumId: string) => void;
}

type AlbumsScreenProps = AlbumsScreenStateProps & AlbumsScreenDispatchProps; // & NavigationScreenProps;

class AlbumsScreen extends Component<AlbumsScreenProps> {
    static navigationOptions = {
        title: "Albums",
    };
    
    constructor(props) {
        super(props);
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
        return <FlatList
            data={this.props.albums}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item } : { item: Album }) => 
                <AlbumItem
                    name={item.name}
                    artist={item.artist}
                    image={item.image}
                    onPress={() => this.props.navigateToAlbum(item.id)} />}
        />
    }
}

const mapStateToProps = ({ app }): AlbumsScreenStateProps => {
    return {
        albums: app.albums
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): AlbumsScreenDispatchProps => {
    return {
        navigateToAlbum: (albumId: string) => {
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