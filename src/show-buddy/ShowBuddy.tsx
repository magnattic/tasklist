import { HookRouter, useRoutes } from "hookrouter";
import React, { useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { fetchShows } from "./plex-api";
import { Season, Show } from "./show-api/ShowApi";
import ShowSearch from "./show-search/ShowSearch";
import styles from "./ShowBuddy.module.scss";
import ShowDetails from "./ShowDetails";

const valueChanged$ = new ReplaySubject<string>(1);

const ShowBuddy: React.FC = props => {
  const [state, setState] = useState({
    search: "",
    searchResults: [] as Show[] | null,
    show: null as Show | null,
    plexShows: [] as string[],
    isShowInPlex: false,
    seasons: [] as Season[]
  });
  useEffect(() => {
    fetchShows().then(shows => {
      setState(state => ({ ...state, plexShows: shows }));
    });
  }, []);

  const searchValueChanged = (search: string) => {
    valueChanged$.next(search);
    setState(state => ({ ...state, search }));
  };

  const routes = {
    "/:id/:name": ({ id }: HookRouter.QueryParams) => (
      <ShowDetails showId={id} plexShows={state.plexShows} />
    ),
    "/": () => <ShowSearch onSearchChanged={searchValueChanged}></ShowSearch>
  };

  const routeResult = useRoutes(routes);

  return (
    <section className={styles.showBuddy}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">ShowBuddy</h1>
          {routeResult}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ShowBuddy);
