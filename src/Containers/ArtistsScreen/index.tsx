import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import { SelectArtist } from "./reducers";
import ArtistItem from "../../Components/ArtistItem"
import * as routes from "../../Infrastructure/Navigation/ArtistsNavigation";

interface ArtistsScreenStateProps {
    artists: Artist[];
}

interface ArtistsScreenDispatchProps {
    navigateToArtist: (artistId: string) => void;
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
        return <FlatList
            data={this.props.artists}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item } : { item: Artist }) => 
                <ArtistItem
                    name={item.name}
                    image={item.image}
                    onPress={() => this.props.navigateToArtist(item.id)} />}
        />
    }
}

const mapStateToProps = ({ app }): ArtistsScreenStateProps => {
    return {
        artists: app.artists
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ArtistsScreenDispatchProps => {
    return {
        navigateToArtist: (artistId: string) => {
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