import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "animate.css";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { SET_USER } from "./store/Types/authType";

import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const user = localStorage.getItem("user");

if (user) {
  store.dispatch({
    type: SET_USER,
    payload: JSON.parse(user).user,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
