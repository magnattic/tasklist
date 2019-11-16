import React, {
  ChangeEventHandler,
  useEffect,
  useState,
  useContext
} from "react";
import { ReplaySubject } from "rxjs";
import { Show } from "../show-api/ShowApi";
import ShowCard from "../show-card/ShowCard";
import "./ShowSearch.scss";
import { ShowContext } from "../..";
import PhantomShowCard from "../show-card/PhantomShowCard";

const valueChanged$ = new ReplaySubject<string>(1);

export const ShowSearch: React.FC<{
  onSearchChanged: (search: string) => void;
}> = props => {
  const showApi = useContext(ShowContext);

  const [state, setState] = useState({
    search: "",
    searchResults: [] as (Show | null)[]
  });

  useEffect(() => {
    const subscription = valueChanged$
      .pipe(showApi.loadShowSearch)
      .subscribe(shows =>
        setState(state => ({
          ...state,
          searchResults: shows
        }))
      );
    return () => subscription.unsubscribe();
  }, [showApi]);

  const searchValueChanged: ChangeEventHandler<HTMLInputElement> = e => {
    const search = e.target.value;
    setState(state => ({
      ...state,
      search,
      searchResults: [null, null, null, null, null]
    }));
    valueChanged$.next(search);
  };

  const searchResultSelected = (show: Show) => {
    const search = show.name;
    props.onSearchChanged(search);
    setState(state => ({
      ...state,
      search,
      searchResults: []
    }));
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
        className={`columns show-suggestions ${
          state.searchResults.length > 0 ? "show-suggestions-visible" : ""
        }`}
      >
        {state.searchResults.length > 0 &&
          state.searchResults.map((show, index) => (
            <div className="column is-one-fifth" key={`show_${index}`}>
              {show !== null ? (
                <ShowCard
                  show={show}
                  showClicked={() => searchResultSelected(show)}
                />
              ) : (
                <PhantomShowCard />
              )}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default React.memo(ShowSearch);
