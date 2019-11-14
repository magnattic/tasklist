import React, { useState, useEffect } from "react";
import { Show, Season, fetchShow } from "./show-api";

const ShowDetails: React.FC<{ showId: number }> = props => {
  const [state, setState] = useState({
    show: null as Show | null,
    plexShows: [] as string[],
    isShowInPlex: false,
    seasons: [] as Season[]
  });

  useEffect(() => {
    const subscription = fetchShow(props.showId).subscribe(show => {
      console.log(show);
      setState(state => ({ ...state, show }));
    });
    return () => subscription.unsubscribe();
  }, [props.showId]);

  return (
    <div>
      {state.show && (
        <section>
          <h2>
            {state.show.name} ({state.isShowInPlex ? "✓" : "x"})
          </h2>
          <p>
            Genres:{" "}
            {state.show.genres &&
              state.show.genres.map(genre => JSON.stringify(genre)).join(",")}
          </p>
          <h3>Seasons</h3>
          <ul>
            {state.seasons.map(season => (
              <li key={season.id}>
                {season.name}
                {season.episodes.map(episode => (
                  <ul>
                    <li key={episode.id}>
                      {season.season_number}:{episode.episode_number}{" "}
                      {episode.name}
                    </li>
                  </ul>
                ))}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default React.memo(ShowDetails);
