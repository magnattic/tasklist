import React, { ChangeEventHandler, useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";
import { loadShowSearch, Show, getShowPoster } from "../show-api";
import "./show-search.scss";

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
            <div
              className="suggestion card"
              key={show.id}
              onClick={e => searchResultSelected(show)}
            >
              <div className="card-image">
                <figure className="image is-16by9">
                  <img src={getShowPoster(show)} alt={show.name} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{show.name}</p>
                    <div className="level">
                      <p className="level-left is-6">
                        <time dateTime={show.first_air_date}>
                          {new Date(show.first_air_date).getFullYear()}
                        </time>
                      </p>
                      <p className="level-right">{show.vote_average}</p>
                    </div>
                  </div>
                </div>

                <div className="content">
                  <p className="show-description">{show.overview}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default React.memo(ShowSearch);
