import { useRoutes, HookRouter } from "hookrouter";
import React from "react";
import "./App.scss";
import { BlogEntry, loadBlogEntry } from "./contentful/content-api";
import { Imprint } from "./Imprint/Imprint";
import ShowBuddy from "./show-buddy/ShowBuddy";
import { Taskpage } from "./TodoList/TaskPage";
import { NavBar } from "./Navbar";
import ShowDetails from "./show-buddy/ShowDetails";

const App: React.FC<{ loadBlogEntry: () => Promise<BlogEntry> }> = props => {
  const routes = {
    "/": () => <Taskpage />,
    "/about": () => <Imprint loadBlogEntry={loadBlogEntry} />,
    "/shows": () => <ShowBuddy />,
    "/shows/:id/:name": ({ id }: HookRouter.QueryParams) => (
      <ShowDetails showId={id} />
    )
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
