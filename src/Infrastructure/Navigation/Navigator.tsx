import React from "react";
import { View } from "react-native";
import { Route, Switch, NativeRouter } from "react-router-native";
import * as routes from "./Routes";
import SongsScreen from "../../Containers/SongsScreen";
import SongScreen from "../../Containers/SongScreen";
import AlbumsScreen from "../../Containers/AlbumsScreen";
import AlbumScreen from "../../Containers/AlbumScreen";
import ArtistsScreen from "../../Containers/ArtistsScreen";
import ArtistScreen from "../../Containers/ArtistScreen";
import NowPlayingBar from "../../Containers/NowPlayingBar";

export default function Navigator() {
    return (
        <NativeRouter>
            <View style={{ height: "100%" }}>
                <Switch>
                    <Route path={routes.Songs} exact component={SongsScreen} /> 
                    <Route path={routes.Song} exact component={SongScreen} /> 
                    <Route path={routes.Albums} exact component={SongsScreen} />
                    <Route path={routes.Album} exact component={SongsScreen} />
                    <Route path={routes.Artists} exact component={SongsScreen} />
                    <Route path={routes.Artist} exact component={SongsScreen} />
                </Switch>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <NowPlayingBar />
                </View>
            </View>
        </NativeRouter>
    );
}