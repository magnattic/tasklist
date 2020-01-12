import { map } from "rxjs/operators";
import { ShowApi } from "../show-api/ShowApi";

export const buddy = (showApi: ShowApi, plexShows: string[]) => {
  return {
    recommendShows: (genre_ids: number[]) =>
      showApi
        .discoverShowsByGenres(genre_ids)
        .pipe(
          map(recommendations =>
            recommendations.filter(show => !plexShows.includes(show.name))
          )
        )
  };
};
