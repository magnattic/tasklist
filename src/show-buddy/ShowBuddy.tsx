import React, { ChangeEventHandler, useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { loadSeasons, Season, Show } from "./show-api";

const valueChanged$ = new ReplaySubject<string>(1);

export const ShowBuddy: React.FC = React.memo(() => {
  const [state, setState] = useState({
    search: "",
    show: null as Show | null,
    seasons: [] as Season[]
  });

  useEffect(() => {
    console.log("effect");
    const subscription = valueChanged$
      .pipe(loadSeasons())
      .subscribe(({ show, seasons }) =>
        setState(state => ({ ...state, show, seasons }))
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
          <h2>{state.show.name}</h2>
          <h3>Seasons</h3>
          <ul>
            {state.seasons.map(season => (
              <li key={season.id}>{season.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});
