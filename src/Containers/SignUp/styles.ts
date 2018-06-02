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
    // title: {
    //     textAlign: "center",
    //     paddingTop: 24,
    //     fontSize: 24,
    //     fontWeight: "bold",
    //     color: "white"
    // }
    // container: {
    //     justifyContent: 'center',
    //     marginTop: 50,
    //     padding: 20,
    //     backgroundColor: "rgba(52, 52, 52, 0.5)",
    //   },
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
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }
});