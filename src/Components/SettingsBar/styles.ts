import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    containerLogout: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#393e42"
    },
    iconLogout: {
        fontSize: 22,
        color: "#7a8690"
    },
    labelLogout: {
        fontSize: 12,
        color: "#7a8690"
    }
});