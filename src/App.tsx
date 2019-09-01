import { A, useRoutes } from "hookrouter";
import React, { FunctionComponent } from "react";
import "./App.css";
import { Imprint } from "./Imprint/Imprint";
import { Taskpage } from "./TodoList/TaskPage";

export const routes = {
  "/": () => <Taskpage />,
  "/about": () => <Imprint />
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
        </ul>
      </header>
    </div>
  );
};

export default App;
