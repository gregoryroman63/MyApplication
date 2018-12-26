import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "./../node_modules/bootstrap/dist/css/bootstrap.css";
import Store from "./admin/redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
