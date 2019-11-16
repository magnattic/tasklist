import React, { ChangeEventHandler, useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Show } from "../show-api/ShowApi";
import { loadShowSearch } from "../show-api/TmdbApi";
import ShowCard from "../show-card/ShowCard";
import "./ShowSearch.scss";

const valueChanged$ = new ReplaySubject<string>(1);

export const ShowSearch: React.FC<{
  onSearchChanged: (search: string) => void;
}> = props => {
  const [state, setState] = useState({
    search: "",
    searchResults: [] as Show[]
  });

  useEffect(() => {
    const subscription = valueChanged$
      .pipe(
        loadShowSearch(),
        tap(console.log)
      )
      .subscribe(shows =>
        setState(state => ({
          ...state,
          searchResults: shows
        }))
      );
    return () => subscription.unsubscribe();
  }, []);

  const searchValueChanged: ChangeEventHandler<HTMLInputElement> = e => {
    const search = e.target.value;
    setState(state => ({
      ...state,
      search
    }));
    valueChanged$.next(search);
  };

  const searchResultSelected = (show: Show) => {
    const search = show.name;
    props.onSearchChanged(search);
    setState(state => ({ ...state, search, searchResults: [] }));
  };

  return (
    <React.Fragment>
      <div className="show-search is-inline-block">
        <input
          type="text"
          className="input"
          placeholder="Your favorite show"
          value={state.search}
          onChange={searchValueChanged}
        ></input>
      </div>
      <div
        className={`show-suggestions ${
          state.searchResults.length > 0 ? "show-suggestions-visible" : ""
        }`}
      >
        {state.searchResults.length > 0 &&
          state.searchResults.map(show => (
            <ShowCard
              show={show}
              showClicked={() => searchResultSelected(show)}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

export default React.memo(ShowSearch);
