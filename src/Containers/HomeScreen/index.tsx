import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import * as routes from "../../Routes";
import { connect, Dispatch } from "react-redux";
import { SelectSong } from "./reducers";
import SongItem from "../../Components/SongItem"

interface HomeScreenStateProps {
    songs: Song[];
}

interface HomeScreenDispatchProps {
    navigateToSong: (songId: string) => void;
}

type HomeScreenProps = HomeScreenStateProps & HomeScreenDispatchProps; // & NavigationScreenProps;

class HomeScreen extends Component<HomeScreenProps> {
    static navigationOptions = {
        title: "Songs",
    };
    
    constructor(props) {
        super(props);
    }

    render() {
        return <FlatList
            data={this.props.songs}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item } : { item: Song }) => 
                <SongItem
                    name={item.name}
                    artist={item.artist}
                    image={item.image}
                    onPress={() => this.props.navigateToSong(item.id)} />}
        />
    }
}

const mapStateToProps = ({ app }): HomeScreenStateProps => {
    return {
        songs: app.songs
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): HomeScreenDispatchProps => {
    return {
        navigateToSong: (songId: string) => {
            dispatch(SelectSong(songId));
            dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        }
    }
}

const HomeScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

export default HomeScreenContainer;