import React from "react";
import { Provider } from "react-redux";
import AppNavigation from "./Infrastructure/Navigation/Navigation";
import store from "./Store";

export default function AppContainer() {
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
  );
}
