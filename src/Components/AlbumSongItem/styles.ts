import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        display: "flex",
        flexDirection: "row"
    },
    name: {
        padding: 5,
        fontSize: 20
    },
    id: {
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: "center"
    }
});