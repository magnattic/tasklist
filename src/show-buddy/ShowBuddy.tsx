import { HookRouter, useRoutes } from "hookrouter";
import React, { useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { getShows } from "./plex-api";
import { Season, Show } from "./show-api/ShowApi";
import { loadSeasonsWithEpisodes } from "./show-api/TmdbApi";
import ShowSearch from "./show-search/ShowSearch";
import styles from "./ShowBuddy.module.scss";
import ShowDetails from "./ShowDetails";

const valueChanged$ = new ReplaySubject<string>(1);

const ShowBuddy: React.FC = props => {
  const [, setState] = useState({
    search: "",
    searchResults: [] as Show[] | null,
    show: null as Show | null,
    plexShows: [] as string[],
    isShowInPlex: false,
    seasons: [] as Season[]
  });
  useEffect(() => {
    getShows().then(shows => {
      setState(state => ({ ...state, plexShows: shows }));
    });
  }, []);

  useEffect(() => {
    const subscription = valueChanged$
      .pipe(loadSeasonsWithEpisodes())
      .subscribe(({ show, seasons }) =>
        setState(state => ({
          ...state,
          show,
          seasons,
          isShowInPlex: show ? state.plexShows.includes(show.name) : false
        }))
      );
    return () => subscription.unsubscribe();
  }, []);

  const searchValueChanged = (search: string) => {
    valueChanged$.next(search);
    setState(state => ({ ...state, search }));
  };

  const routes = {
    "/:id/:name": ({ id }: HookRouter.QueryParams) => (
      <ShowDetails showId={id} />
    ),
    "/": () => <ShowSearch onSearchChanged={searchValueChanged}></ShowSearch>
  };

  const routeResult = useRoutes(routes);
  console.log(routeResult);

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
