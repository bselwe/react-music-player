import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect, Dispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-native";
import * as routes from "../../Infrastructure/Navigation/Routes";
import { FetchUserInfo } from "../SignInScreen/reducers";

interface AfterLoginScreenStateProps {
    userInfo?: Models.UserInfoDTO;
}
interface AfterLoginScreenDispatchProps {
    loadUserInfo: () => void;
    navigateToSongs: () => void;
}

type AfterLoginScreenProps = AfterLoginScreenStateProps & AfterLoginScreenDispatchProps & RouteComponentProps<any>;

class AfterLoginScreen extends Component<AfterLoginScreenProps> {
    componentDidMount() {
        this.props.loadUserInfo();
    }

    printWelcomeMessage(userInfo: Models.UserInfoDTO) {
        return `Welcome ${userInfo.FirstName} ${userInfo.LastName}!`;
    }

    navigateToSongs() {
        setTimeout(() => {
            this.props.navigateToSongs();
        }, 1000);
    }

    render() {
        if (this.props.userInfo !== undefined)
            this.navigateToSongs();

        return <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>
                {this.props.userInfo !== undefined ? this.printWelcomeMessage(this.props.userInfo) : "Loading..."}
            </Text>
        </View>
    }
}

const mapStateToProps = (state: AppState): AfterLoginScreenStateProps => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: RouteComponentProps<any>): AfterLoginScreenDispatchProps => {
    return {
        loadUserInfo: () => {
            dispatch(FetchUserInfo());
        },
        navigateToSongs: () => {
            ownProps.history.replace(routes.Songs);
        }
    }
}

const AfterLoginScreenContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AfterLoginScreen));

export default AfterLoginScreenContainer;