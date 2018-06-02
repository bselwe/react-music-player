import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: "38%"
    },
    progressContainer: {
        marginTop: 36,
        alignSelf: "center"
    },    
    progress: {
        width: 300
    },   
    time: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
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
        flexGrow: 1
    },
    subtitle: {
        textAlign: "center",
        paddingTop: 8,
        fontSize: 18
    },
    iconControllerPlayPause: {
        fontSize: 50,
        marginHorizontal: 20
    },
    iconFastForwardBackword: {
        fontSize: 50
    },
    sound: {
        flexGrow: 1,
        width: 300,
        alignSelf: "center"
    },
    iconSound: {
        fontSize: 21,
        marginTop: 5,
        alignSelf: "center"
    }
});