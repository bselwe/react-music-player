import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: 240
    },
    listContainer: {
        marginTop: 20,
        width: "100%",
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },    
    progressContainer: {
        marginTop: 40,
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
        flexGrow: 1
    },
    iconSound: {
        fontSize: 21,
        marginTop: 5,
        alignSelf: "center"
    }
});