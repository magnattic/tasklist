import { of, pipe } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { debounceTime, map, switchMap } from "rxjs/operators";

const loadShow = (search: string) =>
  fromFetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&pag=1`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.results[0])
  );

const fetchSeasons = (showId: string) =>
  fromFetch(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.seasons)
  );

export const loadShows = () =>
  pipe(
    debounceTime<string>(1000),
    switchMap(search => (search ? loadShow(search) : of(null)))
  );

export const loadSeasons = () =>
  pipe(
    loadShows(),
    switchMap(show => (show ? fetchSeasons(show.id) : of(null)))
  );
