import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadBlogEntry } from "./contentful/content-api";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { FakeShowApi } from "./show-buddy/show-api/FakeApi";
import { ShowApi } from "./show-buddy/show-api/ShowApi";
import { ShowContext } from './show-buddy/show-api/ShowContext';
import { TmdbShowApi } from "./show-buddy/show-api/TmdbApi";
import { store } from "./store/reducer";

const showApi: ShowApi =
  process.env.REACT_APP_OFFLINE_MODE === "true" ? FakeShowApi : TmdbShowApi;

const apollo = new ApolloClient({
  uri: "https://o5x5jzoo7z.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

  ReactDOM.render(
  <ApolloProvider client={apollo}>
    <ShowContext.Provider value={showApi}>
      <Provider store={store}>
        <App loadBlogEntry={loadBlogEntry} />
      </Provider>
    </ShowContext.Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
