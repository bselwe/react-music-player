import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid,FlatList,ScrollView } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as routes from "../../Infrastructure/Navigation/Routes";
import * as Progress from "react-native-progress";
import { connect,Dispatch } from "react-redux";
import ArtistAlbumItem from "../../Components/ArtistAlbumItem"
import { styles } from "./styles";
import { SelectAlbum } from "../AlbumsScreen/reducers";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import Tidal from "../../Services/TidalClient";
import { FetchArtistAlbums } from "../ArtistsScreen/reducers";
interface ArtistScreenStateProps {
    artist: Artist;
    artistAlbums: Album[];
}
interface ArtistScreenDispatchProps {
    navigateToAlbum: (albumId: number) => void;
    fetchArtistAlbums: (artistId: number) => void;
}

type ArtistScreenProps = ArtistScreenStateProps & ArtistScreenDispatchProps; // & NavigationScreenProps;

class ArtistScreen extends Component<ArtistScreenProps> {
    static navigationOptions = {
        title: "Artist",
    };

    componentDidMount() {
        this.props.fetchArtistAlbums(this.props.artist.id);
    }

    getArtistImage(picture: string) {
        if(picture==undefined || picture.length==0)
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEW1tbX///+2trbR0dGvr6/MzMyysrL7+/v19fWkpKSoqKienp69vb3BwcHi4uLX19fs7OyUlJSLi4vn5+eHh4eampqSkpLHx8f29vbb29vU1NQBbJK+AAADJElEQVR4nO3c21bqMBSF4SSE9EipIFR5/wfdLQe3Cu2Va63OjPnfOOpN+EZ6IAF1IfdccHlHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U/n3pmt546sLdfmrQG1BbmC5+6hjVRlQXbq7CMnuh36mNaCXs1CbRSqg3iWbCUuuBYSb0nRLRTugvOpeiodBfVGbRUug/NYimQpVr0VboeyduNBb6opUmWgt9MQgTzYXeb2WJKxAKE+2EH/+JoieqnXAI3243giPaCbd10389NAQn0VAYQ7N9HGzkiJZCF+r2cVFmKnQhPi5GuQWxrXA8vs+i3Jtwa6GLt+3FspYa0VzoUnk9zFl4+43Ygt9e6FLuc+hin7swddNhI/U61iIsTrkLuypj4fU6HOqchcV4JHaSrkE4vW/r3zIWpmkJ1YqdpGsQHsc7qdwUrkDoxsvwIvY0XIHwepI2me5i3H7z4f1e8CS1F46L/OMhz93Eh7A6vUfJ12AudCEF0ZdgL5SOwr8uV+H9+5Zx/JGlMLnhsy/H+m7rMhSm0BX+q6LMTTj6/OsyEaahmAFmIkzbOZ/3Qw7CNMwD/S6Hb+61C0C1L5hKClO/JBQb9leSwt0S0MvtzPxMUDhtwCwkuer9nqRw9kEx1QluzfxIULh4n/G11pf1BYWLl2F31lrTCArDAvDjnMPfW8RyXtiIfdT0lOSd5jIPlPsg5inRJ/7MzbR/07qPTokKX99NN+96p6iTfucdnmfxWB1Et0efEl49Vb/Wv109TqDu3pfwCjg01f4xj8Vxd1D3ye9ihNScq9i2ITaHwymq+zR2okJIsa6qOqZg4FPaLw3X5Md5Pbjynrd+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOIX7v+0IuP+AeAhGRGRvocjAAAAAElFTkSuQmCC";
        return Tidal.artistPicToUrl(picture).lg;
    }
    render() {
        return <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: this.getArtistImage(this.props.artist.picture) }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.artist.name}</Text>
           
            <View style={styles.listContainer}>
                {this.props.artistAlbums.map(album => <View key={album.id} style={{paddingTop: 12,paddingBottom: 12,paddingRight: 8,paddingLeft: 8,width: "50%"}}>
                    <ArtistAlbumItem 
                        name={album.title}
                        image={Tidal.albumArtToUrl(album.cover).lg}
                        onPress={() => this.props.navigateToAlbum(album.id)} /></View>)}
            </View>
            
    
        </ScrollView>;
    }
}

const mapStateToProps = (state: AppState): ArtistScreenStateProps => {
    return {
        artist: state.currentArtist,
        artistAlbums: state.currentArtist !== undefined && state.currentArtist.id in state.artistsAlbums ? state.artistsAlbums[state.currentArtist.id] : []
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ArtistScreenDispatchProps => {
    return {
        fetchArtistAlbums: (artistId: number) => {
            dispatch(FetchArtistAlbums(artistId));
        },
        navigateToAlbum: (albumId: number) => {
            dispatch(SelectAlbum(albumId));
            // FIX dispatch(NavigationActions.navigate({ routeName: routes.Album }));
        }
    }
}
const ArtistScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistScreen);

export default ArtistScreenContainer;