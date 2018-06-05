import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { withRouter, RouteComponentProps } from "react-router-native";
import Icon from "react-native-vector-icons/Feather";
import SongIcon from "react-native-vector-icons/Entypo";
import AlbumIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ArtistIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FavoriteIcon from "react-native-vector-icons/FontAwesome";
import * as routes from "./Routes";

enum Tab {
    Songs,
    Albums,
    Artists,
    Favorites
};

class TabBar extends React.Component<RouteComponentProps<any>, {}> {
    private activeColor = "#406CEE";
    private inactiveColor = "grey";

    selectTab = (tab: Tab) => {
        switch (tab) {
            case Tab.Songs:
                this.props.history.replace(routes.Songs);
                break;
            case Tab.Albums:
                this.props.history.replace(routes.Albums);
                break;
            case Tab.Artists:
                this.props.history.replace(routes.Artists);
                break;
            case Tab.Favorites:
                this.props.history.replace(routes.Favorites);
                break;
        }
    }

    render() {
        return this.shouldDisplayTabBar() ? <View>
            <View style={styles.divider} />
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this.selectTab(Tab.Songs)}>
                    <SongIcon size={28} name="folder-music" color={this.isCurrentTab(routes.Songs) ? this.activeColor : this.inactiveColor} />
                    <Text style={{ fontSize: 12, color: this.isCurrentTab(routes.Songs) ? this.activeColor : this.inactiveColor }}>Songs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.selectTab(Tab.Albums)}>
                    <AlbumIcon size={28} name="album" color={this.isCurrentTab(routes.Albums) ? this.activeColor : this.inactiveColor} />
                    <Text style={{ fontSize: 12, color: this.isCurrentTab(routes.Albums) ? this.activeColor : this.inactiveColor }}>Albums</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.selectTab(Tab.Artists)}>
                    <ArtistIcon size={28} name="artist" color={this.isCurrentTab(routes.Artists) ? this.activeColor : this.inactiveColor} />
                    <Text style={{ fontSize: 12, color: this.isCurrentTab(routes.Artists) ? this.activeColor : this.inactiveColor }}>Artists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.selectTab(Tab.Favorites)}>
                    <FavoriteIcon size={28} name="star" color={this.isCurrentTab(routes.Favorites) ? this.activeColor : this.inactiveColor} />
                    <Text style={{ fontSize: 12, color: this.isCurrentTab(routes.Favorites) ? this.activeColor : this.inactiveColor }}>Favorites</Text>
                </TouchableOpacity>
            </View>
        </View> : null
    }

    shouldDisplayTabBar(): boolean {
        return [routes.Songs, routes.Albums, routes.Artists,routes.Favorites].indexOf(this.props.location.pathname) !== -1;
    }

    isCurrentTab(tab: string) {
        return this.props.location.pathname == tab;
    }
}

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#D9D9DB"
    },
    container: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "white"
    },
    button: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        paddingTop: 4,
        paddingBottom: 4
    }
});

export default withRouter(TabBar);