import { map, tap } from "rxjs/operators";
import { Show, ShowApi } from "../show-api/ShowApi";

export const buddy = (showApi: ShowApi, plexShows: string[]) => {
  return {
    recommendShowsByGenre: (genre_ids: number[]) =>
      showApi.discoverShowsByGenres(genre_ids).pipe(
        tap(() => console.log(plexShows)),
        map((recommendations) =>
          recommendations.filter((show) => !plexShows.includes(show.name))
        )
      ),
    recommendSimilarShows: (show: Show) =>
      showApi
        .discoverShowsByGenres(show.genres.map((genre) => genre.id))
        .pipe(map((recs) => recs.filter((rec) => rec.id !== show.id))),
  };
};
