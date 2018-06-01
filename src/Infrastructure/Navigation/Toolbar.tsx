import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableHighlight } from "react-native";
import { withRouter, RouteComponentProps } from "react-router-native";
import Icon from "react-native-vector-icons/Feather";

export interface ToolbarProps {
    readonly title: string;
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16
    },
    container: {
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexGrow: 1
    },
    icon: {
        fontSize: 24,
        paddingRight: 12
    },
    title: {
        fontSize: 18
    }
});

class Toolbar extends React.Component<ToolbarProps & RouteComponentProps<any>, {}> {
    render() {
        return <TouchableHighlight 
            onPress={() => this.props.history.goBack()}
            style={styles.button}>
            <View style={styles.container}>
                <Icon style={styles.icon} name="arrow-left" />
                <Text style={styles.title}>{this.props.title}</Text>
                <View />
            </View>
        </TouchableHighlight>
    }
}

export default withRouter(Toolbar);