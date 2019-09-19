import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadBlogEntry } from "./contentful/content-api";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { testPlex2 } from "./show-buddy/plex-api";
import { store } from "./store/reducer";

ReactDOM.render(
  <Provider store={store}>
    <App loadBlogEntry={loadBlogEntry} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

testPlex2();
