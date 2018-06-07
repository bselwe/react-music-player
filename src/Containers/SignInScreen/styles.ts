import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(30, 30, 30, 0.9)"
  },
  formContainer: {
    backgroundColor: "white"
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
    marginBottom: 30,
    color: "white",
    fontWeight: "bold"
  },
  error: {
    marginTop: 15,
    color: "#ffb74d",
    marginLeft: 55,
    fontSize: 17
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center'
  },
  buttonTextSignUp: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  button: {
    marginTop: 30,
    height: 45,
    width: "30%",
    backgroundColor: '#ffb74d',
    borderWidth: 0,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  input: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "white",
    borderRadius: 20,
    fontSize: 18,
    paddingLeft: 15
  }
});