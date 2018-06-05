import React from "react";
import { View, ScrollView } from "react-native";
import { Route, Switch, NativeRouter } from "react-router-native";
import * as routes from "./Routes";
import SongsScreen from "../../Containers/SongsScreen";
import SongScreen from "../../Containers/SongScreen";
import AlbumsScreen from "../../Containers/AlbumsScreen";
import AlbumScreen from "../../Containers/AlbumScreen";
import ArtistsScreen from "../../Containers/ArtistsScreen";
import ArtistScreen from "../../Containers/ArtistScreen";
import NowPlayingBar from "../../Containers/NowPlayingBar";
import TabBar from "./TabBar";
import { Authentication } from "../../Containers/Authentication";

export default function Navigator() {
    return (
        <NativeRouter>
            <Authentication>
                <Switch>
                    <Route path={routes.Songs} exact component={SongsScreen} />
                    <Route path={routes.Song} exact component={SongScreen} />
                    <Route path={routes.Albums} exact component={AlbumsScreen} />
                    <Route path={routes.Album} exact component={AlbumScreen} />
                    <Route path={routes.Artists} exact component={ArtistsScreen} />
                    <Route path={routes.Artist} exact component={ArtistScreen} />
                </Switch>

                <View>
                    <NowPlayingBar />
                    <TabBar />
                </View>
            </Authentication>
        </NativeRouter>
    );
}