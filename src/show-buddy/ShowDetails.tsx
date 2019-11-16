import React, { useContext, useEffect, useState } from "react";
import { ShowContext } from "..";
import { Season, Show } from "./show-api/ShowApi";
import ShowCard from "./show-card/ShowCard";

const ShowDetails: React.FC<{ showId: number }> = props => {
  const [state, setState] = useState({
    show: null as Show | null,
    plexShows: [] as string[],
    isShowInPlex: false,
    seasons: [] as Season[]
  });

  const showApi = useContext(ShowContext);

  useEffect(() => {
    const subscription = showApi.fetchShow(props.showId).subscribe(show => {
      setState(state => ({ ...state, show }));
    });
    return () => subscription.unsubscribe();
  }, [props, showApi]);

  return (
    <div>
      {state.show && (
        <section>
          <ShowCard show={state.show} showClicked={() => {}} />
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
