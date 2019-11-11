import { forkJoin, of, pipe } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";

export interface Show {
  id: number;
  name: string;
}

export interface Season {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  episode_count: number;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  air_date: string;
}

const fetchShows = (search: string) =>
  fromFetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&pag=1`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.results as Show[])
  );

const fetchSeasons = (showId: number) =>
  fromFetch(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.seasons as Season[])
  );

const fetchEpisodes = (showId: number, seasonNumber: number) =>
  fromFetch(
    `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  ).pipe(
    switchMap(res => res.json()),
    map(json => json.episodes as Episode[])
  );

export const loadShowSearch = () =>
  pipe(
    debounceTime<string>(200),
    switchMap(search => (search ? fetchShows(search) : of([])))
  );

export const loadShow = () =>
  pipe(
    switchMap((search: string) =>
      search ? fetchShows(search).pipe(map(shows => shows[0])) : of(null)
    )
  );

export const loadSeasons = () =>
  pipe(
    loadShow(),
    switchMap(show =>
      show
        ? fetchSeasons(show.id).pipe(map(seasons => ({ show, seasons })))
        : of({ show: null as Show | null, seasons: [] as Season[] })
    )
  );

export const loadSeasonsWithEpisodes = () =>
  pipe(
    loadSeasons(),
    filter(({ show }) => show != null),
    switchMap(({ show, seasons }) =>
      forkJoin(
        seasons.map((season: Season) =>
          fetchEpisodes(show!.id, season.season_number).pipe(
            map(episodes => ({ ...season, episodes } as Season))
          )
        )
      ).pipe(map(seasons => ({ show, seasons })))
    )
  );

export const loadEpisodes = () =>
  pipe(
    loadSeasons(),
    switchMap(({ show, seasons }) =>
      show ? of({ show, seasons }) : of({ show: null, seasons: [] })
    )
  );
