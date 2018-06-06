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
import FavoritesScreen from "../../Containers/FavoritesScreen";
import ArtistScreen from "../../Containers/ArtistScreen";
import SignInScreen from "../../Containers/SignInScreen";
import LoadingScreen from "../../Containers/LoadingScreen";
import SignUpScreen from "../../Containers/SignUpScreen";
import AfterSignInScreen from "../../Containers/AfterSignInScreen";
import NowPlayingBar from "../../Containers/NowPlayingBar";
import TabBar from "./TabBar";

export default function Navigator() {
    return (
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Switch>
                    <Route path={routes.Loading} exact component={LoadingScreen} />
                    <Route path={routes.SignIn} exact component={SignInScreen} />
                    <Route path={routes.AfterSignIn} exact component={AfterSignInScreen} />
                    <Route path={routes.SignUp} exact component={SignUpScreen} />
                    <PrivateRoute path={routes.Songs} exact component={SongsScreen} />
                    <PrivateRoute path={routes.Song} exact component={SongScreen} />
                    <PrivateRoute path={routes.Albums} exact component={AlbumsScreen} />
                    <PrivateRoute path={routes.Album} exact component={AlbumScreen} />
                    <PrivateRoute path={routes.Artists} exact component={ArtistsScreen} />
                    <PrivateRoute path={routes.Artist} exact component={ArtistScreen} />
                    <PrivateRoute path={routes.Favorites} exact component={FavoritesScreen} />
                </Switch>

                <View>
                    <NowPlayingBar />
                    <TabBar />
                </View>
            </View >
        </NativeRouter >
    );
}