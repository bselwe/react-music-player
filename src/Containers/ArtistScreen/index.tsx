import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid,FlatList,ScrollView } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as routes from "../../Infrastructure/Navigation/AlbumsNavigation";
import * as Progress from "react-native-progress";
import { connect,Dispatch } from "react-redux";
import ArtistAlbumItem from "../../Components/ArtistAlbumItem"
import { styles } from "./styles";
import { SelectAlbum } from "../AlbumsScreen/reducers";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import Tidal from "../../Services/TidalClient";

interface ArtistScreenStateProps {
    artist: Artist;
}
interface ArtistScreenDispatchProps {
    navigateToAlbum: (albumId: number) => void;
}

type ArtistScreenProps = ArtistScreenStateProps & ArtistScreenDispatchProps; // & NavigationScreenProps;

class ArtistScreen extends Component<ArtistScreenProps> {
    static navigationOptions = {
        title: "Artist",
    };

    render() {
        return <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: Tidal.artistPicToUrl(this.props.artist.picture).lg }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.artist.name}</Text>
           
            <View style={styles.listContainer}>
                {/* {this.props.artist.albums.map(album => <View key={album.id} style={{paddingTop: 12,paddingBottom: 12,paddingRight: 8,paddingLeft: 8,width: "50%"}}>
                    <ArtistAlbumItem 
                        name={album.name}
                        image={album.image}
                        onPress={() => this.props.navigateToAlbum(album.id)} /></View>)} */}
            </View>
            
    
        </ScrollView>;
    }
}

const mapStateToProps = ({ app }): ArtistScreenStateProps => {
    return {
        artist: app.currentArtist
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ArtistScreenDispatchProps => {
    return {
        navigateToAlbum: (albumId: number) => {
            dispatch(SelectAlbum(albumId));
            dispatch(NavigationActions.navigate({ routeName: routes.Album }));
        }
    }
}
const ArtistScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistScreen);

export default ArtistScreenContainer;