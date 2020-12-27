import { useContext, useEffect, useState } from "react";
import { of } from "rxjs";
import { Season, Show } from "./show-api/ShowApi";
import { ShowContext } from "./show-api/ShowContext";
import { loadSeasonsWithEpisodes } from "./show-api/TmdbApi";

export const useFetchShow = (showId: number, plexShows: string[]) => {
  const [state, setState] = useState({
    show: null as Show | null,
    isShowInPlex: false,
    seasons: [] as Season[],
  });

  const showApi = useContext(ShowContext);

  useEffect(() => {
    const subscription = showApi.fetchShow(showId).subscribe((show) => {
      setState((state) => ({
        ...state,
        show,
        isShowInPlex: plexShows.includes(show.name),
      }));
    });
    return () => subscription.unsubscribe();
  }, [showId, plexShows, showApi]);

  useEffect(() => {
    const subscription = of(state.show ? state.show.name : "")
      .pipe(loadSeasonsWithEpisodes)
      .subscribe(({ seasons }) =>
        setState((state) => ({
          ...state,
          seasons,
        }))
      );
    return () => subscription.unsubscribe();
  }, [showApi, state.show]);

  return state;
};
