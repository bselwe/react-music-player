import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    albumCover: {
        width: "100%",
        height: 80,
        display: "flex"
        
    },
    shader: {
        height: 60,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgba(52, 52, 52, 0.6)"
    },
    name: {
        fontSize: 20,
        fontStyle: "italic",
        paddingLeft: 20,
        color: "black",
    },
    
   
});