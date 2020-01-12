import { useRoutes } from "hookrouter";
import React from "react";
import "./App.scss";
import { BlogEntry } from "./contentful/content-api";
import { Imprint } from "./Imprint/Imprint";
import { NavBar } from "./Navbar";
import ShowBuddy from "./show-buddy/ShowBuddy";
import { Taskpage } from "./TodoList/TaskPage";
import { Appollo } from "./Apollo";

const App: React.FC<{ loadBlogEntry: () => Promise<BlogEntry> }> = props => {
  const routes = {
    "/": () => <Taskpage />,
    "/about": () => <Imprint loadBlogEntry={props.loadBlogEntry} />,
    "/shows*": () => <ShowBuddy />,
    "/apollo": () => <Appollo />
  };

  const routeResult = useRoutes(routes);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar></NavBar>
      </header>
      {routeResult}
    </div>
  );
};

export default React.memo(App);
