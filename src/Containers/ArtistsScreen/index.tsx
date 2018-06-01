import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import { connect, Dispatch } from "react-redux";
import { SelectArtist, FetchArtists } from "./reducers";
import ArtistItem from "../../Components/ArtistItem"
import * as routes from "../../Infrastructure/Navigation/Routes";
import Tidal from "../../Services/TidalClient";

interface ArtistsScreenStateProps {
    artists: Artist[];
}

interface ArtistsScreenDispatchProps {
    navigateToArtist: (artistId: number) => void;
    fetchArtists: (query?: string) => void;
}

type ArtistsScreenProps = ArtistsScreenStateProps & ArtistsScreenDispatchProps; // & NavigationScreenProps;

class ArtistsScreen extends Component<ArtistsScreenProps> {
    static navigationOptions = {
        title: "Artists",
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchArtists();
    }

    getArtistImage(picture: string) {
        if(picture==undefined || picture.length==0)
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEW1tbX///+2trbR0dGvr6/MzMyysrL7+/v19fWkpKSoqKienp69vb3BwcHi4uLX19fs7OyUlJSLi4vn5+eHh4eampqSkpLHx8f29vbb29vU1NQBbJK+AAADJElEQVR4nO3c21bqMBSF4SSE9EipIFR5/wfdLQe3Cu2Va63OjPnfOOpN+EZ6IAF1IfdccHlHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U/n3pmt546sLdfmrQG1BbmC5+6hjVRlQXbq7CMnuh36mNaCXs1CbRSqg3iWbCUuuBYSb0nRLRTugvOpeiodBfVGbRUug/NYimQpVr0VboeyduNBb6opUmWgt9MQgTzYXeb2WJKxAKE+2EH/+JoieqnXAI3243giPaCbd10389NAQn0VAYQ7N9HGzkiJZCF+r2cVFmKnQhPi5GuQWxrXA8vs+i3Jtwa6GLt+3FspYa0VzoUnk9zFl4+43Ygt9e6FLuc+hin7swddNhI/U61iIsTrkLuypj4fU6HOqchcV4JHaSrkE4vW/r3zIWpmkJ1YqdpGsQHsc7qdwUrkDoxsvwIvY0XIHwepI2me5i3H7z4f1e8CS1F46L/OMhz93Eh7A6vUfJ12AudCEF0ZdgL5SOwr8uV+H9+5Zx/JGlMLnhsy/H+m7rMhSm0BX+q6LMTTj6/OsyEaahmAFmIkzbOZ/3Qw7CNMwD/S6Hb+61C0C1L5hKClO/JBQb9leSwt0S0MvtzPxMUDhtwCwkuer9nqRw9kEx1QluzfxIULh4n/G11pf1BYWLl2F31lrTCArDAvDjnMPfW8RyXtiIfdT0lOSd5jIPlPsg5inRJ/7MzbR/07qPTokKX99NN+96p6iTfucdnmfxWB1Et0efEl49Vb/Wv109TqDu3pfwCjg01f4xj8Vxd1D3ye9ihNScq9i2ITaHwymq+zR2okJIsa6qOqZg4FPaLw3X5Md5Pbjynrd+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOIX7v+0IuP+AeAhGRGRvocjAAAAAElFTkSuQmCC";
        return Tidal.artistPicToUrl(picture).lg;
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
                onChangeText={(text) => this.props.fetchArtists(text)} />
            <FlatList
                data={this.props.artists}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }: { item: Artist }) =>
                    <ArtistItem
                        name={item.name}
                        image={this.getArtistImage(item.picture)}
                        onPress={() => this.props.navigateToArtist(item.id)} />}
            />
        </View>
    }
}

const mapStateToProps = (state: AppState): ArtistsScreenStateProps => {
    return {
        artists: state.artists
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ArtistsScreenDispatchProps => {
    return {
        navigateToArtist: (artistId: number) => {
            dispatch(SelectArtist(artistId));
            // FIX dispatch(NavigationActions.navigate({ routeName: routes.Artist }));
        },
        fetchArtists: (query ?: string) =>{
            dispatch(FetchArtists(query));
        }
    }
}

const ArtistsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistsScreen);

export default ArtistsScreenContainer;