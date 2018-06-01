import React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import Navigator from "./Infrastructure/Navigation/Navigator";

export default function AppContainer() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
  );
}