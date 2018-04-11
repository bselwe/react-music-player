import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    albumCover: {
        width: "100%",
        height: 80,
        display: "flex"
    },
    shader: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgba(52, 52, 52, 0.6)",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20,
        color: "white",
    },
    artist: {
        fontSize: 20,
        paddingLeft: 20,
        fontStyle: "italic",
        color: "white",
    }
});