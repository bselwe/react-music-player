import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { withRouter, RouteComponentProps } from "react-router-native";
import Icon from "react-native-vector-icons/Feather";

export interface ToolbarProps {
    readonly title: string;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexGrow: 1
    },
    button: {
        display: "flex",
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingLeft: 18,
        paddingRight: 18
    },
    icon: {
        fontSize: 24
    },
    title: {
        fontSize: 18
    }
});

class Toolbar extends React.Component<ToolbarProps & RouteComponentProps<any>, {}> {
    render() {
        return <View style={{ height: 48 }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => this.props.history.goBack()}>
                    <Icon style={styles.icon} name="arrow-left" />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                <View />
            </View>
        </View>;
    }
}

export default withRouter(Toolbar);