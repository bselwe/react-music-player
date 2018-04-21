import React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import TabNavigation from "./Infrastructure/Navigation/TabNavigation";

export default function AppContainer() {
    return (
        <Provider store={store}>
            <TabNavigation />
        </Provider>
  );
}