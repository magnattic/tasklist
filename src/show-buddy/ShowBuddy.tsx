import React, { ChangeEventHandler, useState } from "react";
import { fromFetch } from "rxjs/fetch";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime, map, switchMap } from "rxjs/operators";

const valueChanged$ = new Subject<string>();
valueChanged$
  .pipe(
    debounceTime(1000),
    switchMap(search =>
      fromFetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&pag=1`
      )
    ),
    switchMap(res => res.json()),
    map(json => json.results[0])
  )
  .subscribe(console.log);

export const ShowBuddy: React.FC = () => {
  const [state, setState] = useState({ search: "" });

  const searchValueChanged: ChangeEventHandler<HTMLInputElement> = e => {
    valueChanged$.next(e.target.value);
    setState({ search: e.target.value });
  };

  return (
    <div>
      <h1>ShowBuddy</h1>
      <input
        type="text"
        value={state.search}
        onChange={searchValueChanged}
      ></input>
    </div>
  );
};
