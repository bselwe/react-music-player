import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import { SelectSong } from "./reducers";
import SongItem from "../../Components/SongItem"
import * as routes from "../../Infrastructure/Navigation/SongsNavigation";

interface SongsScreenStateProps {
    songs: Song[];
}

interface SongsScreenDispatchProps {
    navigateToSong: (songId: string) => void;
}

type SongsScreenProps = SongsScreenStateProps & SongsScreenDispatchProps; // & NavigationScreenProps;

class SongsScreen extends Component<SongsScreenProps> {
    static navigationOptions = {
        title: "Songs",
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
            data={this.props.songs}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item } : { item: Song }) => 
                <SongItem
                    name={item.name}
                    artist={item.artist}
                    image={item.image}
                    onPress={() => this.props.navigateToSong(item.id)} />}
        />
    }
}

const mapStateToProps = ({ app }): SongsScreenStateProps => {
    return {
        songs: app.songs
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SongsScreenDispatchProps => {
    return {
        navigateToSong: (songId: string) => {
            dispatch(SelectSong(songId));
            // dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        }
    }
}

const SongsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsScreen);

export default SongsScreenContainer;