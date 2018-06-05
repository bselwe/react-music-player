import React from "react";
import { View, ScrollView } from "react-native";
import { Route, Switch, NativeRouter } from "react-router-native";
import PrivateRoute from "./PrivateRoute";
import * as routes from "./Routes";
import SongsScreen from "../../Containers/SongsScreen";
import SongScreen from "../../Containers/SongScreen";
import AlbumsScreen from "../../Containers/AlbumsScreen";
import AlbumScreen from "../../Containers/AlbumScreen";
import ArtistsScreen from "../../Containers/ArtistsScreen";
import ArtistScreen from "../../Containers/ArtistScreen";
import SignInScreen from "../../Containers/SignInScreen";
import SignUpScreen from "../../Containers/SignUpScreen";
import NowPlayingBar from "../../Containers/NowPlayingBar";
import TabBar from "./TabBar";

export default function Navigator() {
    return (
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Switch>
                    <PrivateRoute path={routes.Songs} exact component={SongsScreen} />
                    <PrivateRoute path={routes.Song} exact component={SongScreen} />
                    <PrivateRoute path={routes.Albums} exact component={AlbumsScreen} />
                    <PrivateRoute path={routes.Album} exact component={AlbumScreen} />
                    <PrivateRoute path={routes.Artists} exact component={ArtistsScreen} />
                    <PrivateRoute path={routes.Artist} exact component={ArtistScreen} />
                    <Route path={routes.SignIn} exact component={SignInScreen} />
                    <Route path={routes.SignUp} exact component={SignUpScreen} />
                </Switch>

                <View>
                    <NowPlayingBar />
                    <TabBar />
                </View>
            </View >
        </NativeRouter >
    );
}