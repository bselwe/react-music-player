import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Slider, ProgressBarAndroid,FlatList } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import { NavigationScreenProps, NavigationActions } from "react-navigation";
// import { connect, Dispatch } from "react-redux";
// import { SelectSong } from "./reducers";
import * as Progress from "react-native-progress";
import { connect,Dispatch } from "react-redux";
import AlbumItemArtistScreen from "../../Components/AlbumItemArtistScreen"
import { styles } from "./styles";

interface ArtistScreenStateProps {
    artist: Artist;
}
interface ArtistScreenDispatchProps {
    navigateToSong: (songId: string) => void;
}

type ArtistScreenProps = ArtistScreenStateProps & ArtistScreenDispatchProps; // & NavigationScreenProps;

class ArtistScreen extends Component<ArtistScreenProps> {
    static navigationOptions = {
        title: "Artist",
    };

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
        
        return <View style={styles.container}>
            <Image
                source={{ uri: this.props.artist.image }}
                style={styles.image} />
            <Text style={styles.title}>{this.props.artist.name}</Text>
            

    {/* <FlatList
            data={this.props.artist.albums}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item } : { item: Album }) => 
                <AlbumItemArtistScreen
                    name={item.name}
                    image={item.image}
                    onPress={() => this.props.navigateToSong(item.id)} />}
        /> */}
        </View>;
    }
}

const mapStateToProps = ({ app }): ArtistScreenStateProps => {
    return {
        artist: app.currentArtist
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): ArtistScreenDispatchProps => {
    return {
        navigateToSong: (songId: string) => {
          //  dispatch(SelectSong(songId));
           // dispatch(NavigationActions.navigate({ routeName: routes.Song }));
        }
    }
}
const ArtistScreenContainer = connect(
    mapStateToProps,
    undefined
)(ArtistScreen);

export default ArtistScreenContainer;