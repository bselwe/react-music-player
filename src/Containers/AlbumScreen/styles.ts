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
    },    
    title: {
        textAlign: "center",
        paddingTop: 24,
        fontSize: 24,
        fontWeight: "bold"
    },
    subtitle: {
        paddingTop: 8,
        fontSize: 18
    }
});