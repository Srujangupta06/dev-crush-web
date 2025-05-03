import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appstore.js";
import "react-tooltip/dist/react-tooltip.css";
createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>
);
