import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";
import Root from "./view";

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
