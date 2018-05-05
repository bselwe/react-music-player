import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { SelectArtist } from "./reducers";
import ArtistItem from "../../Components/ArtistItem"
import * as routes from "../../Infrastructure/Navigation/ArtistsNavigation";
import Tidal from "../../Services/TidalClient";

interface ArtistsScreenStateProps {
    artists: Artist[];
}

interface ArtistsScreenDispatchProps {
    navigateToArtist: (artistId: number) => void;
}

type ArtistsScreenProps = ArtistsScreenStateProps & ArtistsScreenDispatchProps; // & NavigationScreenProps;

class ArtistsScreen extends Component<ArtistsScreenProps> {
    static navigationOptions = {
        title: "Artists",
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
        return <View>
            <SearchBar
                placeholder='Search' />
            <FlatList
                data={this.props.artists}
                keyExtractor={(item, index) => item.id}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Artist }) =>
                    <ArtistItem
                        name={item.name}
                        image={Tidal.artistPicToUrl(item.picture).lg}
                        onPress={() => this.props.navigateToArtist(item.id)} />}
            />
        </View>
    }
}

const mapStateToProps = ({ app }): ArtistsScreenStateProps => {
    return {
        artists: app.artists
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ArtistsScreenDispatchProps => {
    return {
        navigateToArtist: (artistId: number) => {
            dispatch(SelectArtist(artistId));
            dispatch(NavigationActions.navigate({ routeName: routes.Artist }));
        }
    }
}

const ArtistsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistsScreen);

export default ArtistsScreenContainer;