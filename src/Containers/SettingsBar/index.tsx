import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { SearchBar } from 'react-native-elements';
import { styles } from "./styles";
import { Dispatch, connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-native";
import * as routes from "../../Infrastructure/Navigation/Routes";
import { loginManager } from "../../Services/LoginManager";
import { SignOutFromStore } from "../SignInScreen/reducers";

interface SettingsBarProps {
    readonly onChangeText: (text) => void;
}

interface SettingsBarDispatchProps {
    readonly logout: () => void;
}

export class SettingsBar extends Component<SettingsBarProps & SettingsBarDispatchProps> {
    render() {
        return <View style={styles.container}>
            <SearchBar
                round
                containerStyle={{ flexGrow: 1, borderBottomWidth: 0, borderTopWidth: 0 }}
                placeholder='Search'
                onChangeText={this.props.onChangeText} />
            <View style={styles.containerLogout}>
                <TouchableOpacity style={{alignItems: "center"}} onPress={() => this.props.logout()}>
                    <MaterialCommunityIcons name="logout" style={styles.iconLogout} />
                    <Text style={styles.labelLogout}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: RouteComponentProps<any>): SettingsBarDispatchProps => {
    return {
        logout: () => {
            loginManager.signOut();
            dispatch(SignOutFromStore());
            ownProps.history.replace(routes.SignIn);
        }
    }
}
const SettingsBarContainer = withRouter(connect(
    undefined,
    mapDispatchToProps
)(SettingsBar));

export default SettingsBarContainer;