import React, {
  useState,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect
} from "react";
import { Show, loadShowSearch } from "../show-api";
import { ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";

const valueChanged$ = new ReplaySubject<string>(1);

export const ShowSearch: React.FC<{
  onSearchChanged: (search: string) => void;
}> = React.memo(props => {
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

  const searchResultSelected: MouseEventHandler<HTMLAnchorElement> = e => {
    const search = e.currentTarget.text;
    props.onSearchChanged(search);
    setState(state => ({ ...state, search, searchResults: [] }));
  };

  return (
    <div className="show-search is-inline-block">
      <input
        type="text"
        className="input"
        placeholder="Your favorite show"
        value={state.search}
        onChange={searchValueChanged}
      ></input>
      <div
        className={`show-suggestions ${
          state.searchResults ? "show-suggestions-visible" : ""
        } list is-hoverable`}
      >
        {state.searchResults &&
          state.searchResults.map(show => (
            <a
              className="list-item"
              key={show.id}
              onClick={searchResultSelected}
            >
              {show.name}
            </a>
          ))}
      </div>
    </div>
  );
});
