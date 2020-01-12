import { forkJoin, of, pipe, from } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  debounceTime,
  delay,
  filter,
  map,
  switchMap,
  tap,
  mergeMap,
  concatMap,
  toArray
} from "rxjs/operators";
import { Episode, Season, Show, ShowApi } from "./ShowApi";
import { combinations } from "../../utils/combinations";

export interface Config {
  images: {
    base_url: string;
    secure_base_url: string;
    poster_sizes: string[];
  };
}

const baseUrl = "https://api.themoviedb.org/3/";
const buildApiUrl = (path: string, query?: { [key: string]: string }) => {
  const queryParams = new URLSearchParams(
    Object.entries({
      api_key: process.env.REACT_APP_TMDB_API_KEY as string,
      ...query
    })
  );
  return `${baseUrl}${path}?${queryParams}`;
};

export const discoverShowsByGenres = (genreIds: number[]) =>
  from(combinations(genreIds).reverse()).pipe(
    concatMap(genreIdSubset =>
      fromFetch(
        buildApiUrl("discover/tv", {
          with_genres: genreIdSubset.join(","),
          sort_by: "vote_average.desc",
          "vote_count.gte": "200",
          "first_air_date.gte": "2000"
        })
      )
    ),
    switchMap(res => res.json()),
    map(json => json.results as Show[]),
    toArray(),
    // tap(show => console.log(show.map(s => s.name)))
    // tap(x => console.log(JSON.stringify(x.map(y => y.map(z => z.name))))),
    map(shows => shows.flat()),
    map(shows => shows.filter((value, index, self) => self.findIndex(item => item.id === value.id) === index))
  );

const fetchShows = (search: string) =>
  fromFetch(buildApiUrl("search/tv", { query: search, pag: "1" })).pipe(
    switchMap(res => res.json()),
    map(json => json.results as Show[])
  );

export const fetchShow = (showId: number) =>
  fromFetch(buildApiUrl(`tv/${showId}`)).pipe(
    switchMap(res => res.json() as Promise<Show>)
  );

const fetchSeasons = (showId: number) =>
  fetchShow(showId).pipe(map(json => json.seasons as Season[]));

const fetchEpisodes = (showId: number, seasonNumber: number) =>
  fromFetch(buildApiUrl(`tv/${showId}/season/${seasonNumber}`)).pipe(
    switchMap(res => res.json()),
    map(json => json.episodes as Episode[])
  );

export const loadShowByName = (search: string) =>
  fetchShows(search).pipe(map(shows => shows[0]));

const loadShowSearch = pipe(
  debounceTime<string>(200),
  delay(1000),
  switchMap(search =>
    search ? fetchShows(search).pipe(map(shows => shows.slice(0, 5))) : of([])
  )
);

export const loadShow = () =>
  pipe(
    switchMap((search: string) => (search ? loadShowByName(search) : of(null)))
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

export const loadSeasonsWithEpisodes = pipe(
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

export const getShowPoster = (show: Show, size = 300) =>
  `http://image.tmdb.org/t/p/w${size}${show.backdrop_path}`;

export const TmdbShowApi: ShowApi = {
  fetchShow,
  getShowPoster,
  loadShowSearch,
  discoverShowsByGenres
};
