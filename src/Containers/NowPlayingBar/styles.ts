import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    },
    progress: {
        width: "100%",
        height: 6
    },  
    name: {
        marginTop: 10,
        fontWeight: "bold"
    },
    artist: {
        marginBottom: 12
    },
    play: {
        paddingTop: 6,
        position: "absolute",
        right: 16
    }
});