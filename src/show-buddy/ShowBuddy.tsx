import React, { useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { getShows } from "./plex-api";
import { loadSeasonsWithEpisodes, Season, Show } from "./show-api";
import ShowSearch from "./show-search/show-search";
import "./ShowBuddy.scss";

const valueChanged$ = new ReplaySubject<string>(1);

const ShowBuddy: React.FC = () => {
  const [state, setState] = useState({
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

  return (
    <React.Fragment>
      <section className="show-buddy hero is-primary is-medium is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">ShowBuddy</h1>

            <ShowSearch onSearchChanged={searchValueChanged}></ShowSearch>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default React.memo(ShowBuddy);
