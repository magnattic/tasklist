import React, { useContext, useEffect, useState } from "react";
import { of } from "rxjs";
import { Episode, Season, Show } from "./show-api/ShowApi";
import { loadSeasonsWithEpisodes } from "./show-api/TmdbApi";
import ShowCard from "./show-card/ShowCard";
import { buddy } from "./show-recommendation/buddy";
import { navigate } from "hookrouter";
import { ShowContext } from "./show-api/ShowContext";

const ShowDetails: React.FC<{
  showId: number;
  plexShows: string[];
}> = props => {
  const [state, setState] = useState({
    show: null as Show | null,
    isShowInPlex: false,
    seasons: [] as Season[],
    plexEpisodes: [] as Episode[],
    showRecommendations: [] as Show[]
  });

  const showApi = useContext(ShowContext);

  useEffect(() => {
    const subscription = showApi.fetchShow(props.showId).subscribe(show => {
      setState(state => ({
        ...state,
        show,
        isShowInPlex: props.plexShows.includes(show.name)
      }));
    });
    return () => subscription.unsubscribe();
  }, [props, showApi]);

  useEffect(() => {
    if (showApi && props.plexShows.length && state.show) {
      console.log('run', showApi, state.show);
      const subscription = buddy(showApi, props.plexShows)
        .recommendShows(state.show!.genres.map(genres => genres.id))
        .subscribe(shows => {
          setState(state => ({
            ...state,
            showRecommendations: shows
          }));
        });
      return () => subscription.unsubscribe();
    }
  }, [props.plexShows, showApi, state.show]);

  useEffect(() => {
    const subscription = of(state.show ? state.show.name : "")
      .pipe(loadSeasonsWithEpisodes)
      .subscribe(({ seasons }) =>
        setState(state => ({
          ...state,
          seasons
        }))
      );
    return () => subscription.unsubscribe();
  }, [props, showApi, state.show]);

  return (
    <div>
      {state.show && (
        <section>
          <ShowCard show={state.show} showClicked={() => {}} />
          <div className="container">
            <div className="row">
              {state.showRecommendations.map(showRec => (
                <div className="col" key={showRec.id}>
                  <ShowCard show={showRec} showClicked={() => {navigate(`/shows/${showRec.id}/${showRec.name}`);}} />
                </div>
              ))}
            </div>
          </div>
          <h2>
            {state.show.name} ({state.isShowInPlex ? "✓" : "x"})
          </h2>
          <p>
            Genres:{" "}
            {state.show.genres &&
              state.show.genres.map(genre => genre.name).join(" / ")}
          </p>
          <h3>Seasons</h3>
          <ul>
            {state.seasons.map(season => (
              <li key={season.id}>
                {season.name}
                <ul>
                  {season.episodes.map(episode => (
                    <li key={episode.id}>
                      S{season.season_number.toString().padStart(2, "0")}E
                      {episode.episode_number.toString().padStart(2, "0")}{" "}
                      {episode.name} ({episode.air_date}) (
                      {state.plexEpisodes.find(
                        plexEpisode =>
                          plexEpisode.episode_number === episode.episode_number
                      ) != null
                        ? "✓"
                        : "x"}
                      )
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default React.memo(ShowDetails);
