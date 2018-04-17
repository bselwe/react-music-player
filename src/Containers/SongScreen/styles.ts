import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column"
    },
    image: {
        width: "100%",
        height: 240
    },
    title: {
        textAlign: "center",
        paddingTop: 24,
        fontSize: 24,
        fontWeight: "bold"
    },
    controlls: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 2
    },
    subtitle: {
        textAlign: "center",
        paddingTop: 8,
        fontSize: 18
    },
    iconControllerPlay: {
        fontSize: 90,
        marginHorizontal: 20
    },
    iconFastForwardBackword: {
        fontSize: 55
    },
    sound: {
        width: 300,
        flexGrow: 1,
        alignSelf: "center"
    },
    iconSound: {
        fontSize: 21,
        marginTop: 5,
        alignSelf: "center"
    }
});