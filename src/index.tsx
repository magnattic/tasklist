import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadBlogEntry } from "./contentful/content-api";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store/reducer";
import { TmdbShowApi } from "./show-buddy/show-api/TmdbApi";
import { ShowApi } from "./show-buddy/show-api/ShowApi";
import { FakeShowApi } from "./show-buddy/show-api/FakeApi";

export const ShowContext = createContext<ShowApi>(TmdbShowApi);

const showApi: ShowApi =
  process.env.REACT_APP_OFFLINE_MODE === "true" ? FakeShowApi : TmdbShowApi;

ReactDOM.render(
  <ShowContext.Provider value={showApi}>
    <Provider store={store}>
      <App loadBlogEntry={loadBlogEntry} />
    </Provider>
  </ShowContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
