import React, { ChangeEventHandler, useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { getShows } from "./plex-api";
import { loadSeasonsWithEpisodes, Season, Show } from "./show-api";

const valueChanged$ = new ReplaySubject<string>(1);

export const ShowBuddy: React.FC = React.memo(() => {
  const [state, setState] = useState({
    search: "",
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

  const searchValueChanged: ChangeEventHandler<HTMLInputElement> = e => {
    const search = e.target.value;
    valueChanged$.next(search);
    setState(state => ({ ...state, search }));
  };

  return (
    <div>
      <h1>ShowBuddy</h1>
      <input
        type="text"
        value={state.search}
        onChange={searchValueChanged}
      ></input>
      {state.show && (
        <section>
          <h2>
            {state.show.name} ({state.isShowInPlex ? "✓" : "x"})
          </h2>
          <h3>Seasons</h3>
          <ul>
            {state.seasons.map(season => (
              <li key={season.id}>{season.name}
              {season.episodes.map(episode => (
                <ul>
                  <li key={episode.id}>{episode.name}</li>
                </ul>
                ))}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});
