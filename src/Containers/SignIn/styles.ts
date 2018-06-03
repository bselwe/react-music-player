import { StyleSheet } from "react-native";
import t from 'tcomb-form-native';

const stylesheet = t.form.Form.stylesheet;

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;

stylesheet.textbox.normal.fontSize = 20;

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    padding: 20
  },
  formContainer: {
    backgroundColor: "white"
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