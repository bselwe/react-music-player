import React from "react";
import { Provider } from "react-redux";

import App from "./App";
import store from "./Store";

export default function AppContainer() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
  );
}
