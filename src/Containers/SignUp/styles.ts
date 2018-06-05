import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(52, 52, 52, 0.5)",
        padding: 20
    },
      title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30,
        color: "white"
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        marginTop: 20,
        height: 36,
        width: "40%",
        backgroundColor: '#ffb74d',
        borderWidth: 0,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center'
      }
});