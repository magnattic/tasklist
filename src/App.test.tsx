import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadBlogEntry } from "./contentful/content-api-mock";
import { store } from "./store/reducer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App loadBlogEntry={loadBlogEntry} />
    </Provider>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
