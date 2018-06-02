import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { withRouter, RouteComponentProps } from "react-router-native";
import Icon from "react-native-vector-icons/Feather";

export interface ToolbarProps {
    readonly title: string;
}

const styles = StyleSheet.create({
    view: {
        height: 49
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#D9D9DB"
    },
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
        return <View style={styles.view}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => this.props.history.goBack()}>
                    <Icon style={styles.icon} name="arrow-left" />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                <View />
            </View>
            <View style={styles.divider} />
        </View>;
    }
}

export default withRouter(Toolbar);