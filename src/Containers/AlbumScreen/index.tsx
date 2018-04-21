import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import * as routes from "../../Routes";
import { connect, Dispatch } from "react-redux";
import { SelectAlbum } from "./reducers";
import AlbumItem from "../../Components/AlbumItem"

interface AlbumScreenStateProps {
    albums: Song[];
}

interface AlbumScreenDispatchProps {
    navigateToAlbum: (albumId: string) => void;
}

type AlbumScreenProps = AlbumScreenStateProps & AlbumScreenDispatchProps; // & NavigationScreenProps;

class AlbumScreen extends Component<AlbumScreenProps> {
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

const mapStateToProps = ({ app }): AlbumScreenStateProps => {
    return {
        albums: app.albums
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): AlbumScreenDispatchProps => {
    return {
        navigateToAlbum: (albumId: string) => {
            dispatch(SelectAlbum(albumId));
            dispatch(NavigationActions.navigate({ routeName: routes.Album }));
        }
    }
}

const AlbumScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumScreen);

export default AlbumScreenContainer;