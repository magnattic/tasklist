import { A, useRoutes } from "hookrouter";
import React, { FunctionComponent } from "react";
import "./App.css";
import { loadBlogEntry } from "./contentful/content-api";
import { Imprint } from "./Imprint/Imprint";
import { ShowBuddy } from "./show-buddy/ShowBuddy";
import { Taskpage } from "./TodoList/TaskPage";

export const routes = {
  "/": () => <Taskpage />,
  "/about": () => <Imprint loadBlogEntry={loadBlogEntry} />,
  "/shows": () => <ShowBuddy />
};

const App: FunctionComponent = () => {
  const routeResult = useRoutes(routes);

  return (
    <div className="App">
      <header className="App-header">
        {routeResult}
        <ul>
          <li>
            <A href="/">Tasks</A>
          </li>
          <li>
            <A href="/about">Imprint</A>
          </li>
          <li>
            <A href="/shows">Shows</A>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default App;
