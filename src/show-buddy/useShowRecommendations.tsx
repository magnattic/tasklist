import { useContext, useEffect, useState } from "react";
import { Show } from "./show-api/ShowApi";
import { ShowContext } from "./show-api/ShowContext";
import { buddy } from "./show-recommendation/buddy";

export const useShowRecommendations = (
  show: Show | null,
  plexShows: string[]
) => {
  const showApi = useContext(ShowContext);
  const [showRecommendations, setShowRecommendations] = useState([] as Show[]);

  useEffect(() => {
    if (showApi && plexShows && show) {
      const subscription = buddy(showApi, plexShows)
        .recommendSimilarShows(show)
        .subscribe((shows) => setShowRecommendations(shows));
      return () => subscription.unsubscribe();
    }
  }, [plexShows, showApi, show]);

  return showRecommendations;
};
