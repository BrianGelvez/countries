import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Corrección aquí
import store from "./Redux/store";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);