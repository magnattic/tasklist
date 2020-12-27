import classNames from "classnames";
import { navigate } from "hookrouter";
import React from "react";
import ShowCard from "./show-card/ShowCard";
import styles from "./ShowDetails.module.scss";
import { useFetchShow } from "./useFetchShowAndSeasons";
import { useShowRecommendations } from "./useShowRecommendations";

const ShowDetails: React.FC<{
  showId: number;
  plexShows: string[];
}> = (props) => {
  const { show, seasons, isShowInPlex } = useFetchShow(
    props.showId,
    props.plexShows
  );

  const showRecommendations = useShowRecommendations(show, props.plexShows);

  return (
    <div>
      {show && (
        <section>
          <ShowCard show={show} showClicked={() => {}} />
          <div className={classNames("columns", styles.recommendations)}>
            {showRecommendations.map((showRec) => (
              <div className={styles.recommendation} key={showRec.id}>
                <ShowCard
                  show={showRec}
                  showClicked={() => {
                    navigate(`/shows/${showRec.id}/${showRec.name}`);
                  }}
                />
              </div>
            ))}
          </div>
          <h2>
            {show.name} ({isShowInPlex ? "✓" : "x"})
          </h2>
          <p>
            Genres:{" "}
            {show.genres && show.genres.map((genre) => genre.name).join(" / ")}
          </p>
          <h3>Seasons</h3>
          <ul>
            {seasons.map((season) => (
              <li key={season.id}>
                {season.name}
                <ul>
                  {season.episodes.map((episode) => (
                    <li key={episode.id}>
                      S{season.season_number.toString().padStart(2, "0")}E
                      {episode.episode_number.toString().padStart(2, "0")}{" "}
                      {episode.name} ({episode.air_date}) (
                      {/* {state.plexEpisodes.find(
                        (plexEpisode) =>
                          plexEpisode.episode_number === episode.episode_number
                      ) != null
                        ? "✓"
                        : "x"} */}
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
