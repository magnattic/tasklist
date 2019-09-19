import { of, pipe } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { debounceTime, map, switchMap } from "rxjs/operators";

export interface Show {
  id: number;
  name: string;
}

export interface Season {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
}

const loadShow = (search: string) =>
  fromFetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&pag=1`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.results[0] as Show)
  );

const fetchSeasons = (showId: number) =>
  fromFetch(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.seasons as Season[])
  );

export const loadShows = () =>
  pipe(
    debounceTime<string>(1000),
    switchMap(search => (search ? loadShow(search) : of(null)))
  );

export const loadSeasons = () =>
  pipe(
    loadShows(),
    switchMap(show =>
      show
        ? fetchSeasons(show.id).pipe(map(seasons => ({ show, seasons })))
        : of({ show: null, seasons: [] })
    )
  );
