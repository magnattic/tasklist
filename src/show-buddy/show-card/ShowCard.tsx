import React, { useContext } from "react";
import { ShowContext } from "../..";
import { Show } from "../show-api/ShowApi";
import "./ShowCard.scss";

const ShowCard: React.FC<{
  show: Show | null;
  showClicked: () => void;
}> = props => {
  const show = props.show;

  const showApi = useContext(ShowContext);

  return (
    <div
      className={`suggestion card${
        show === null ? " suggestion--loading" : ""
      }`}
      onClick={() => props.showClicked()}
    >
      {show && (
        <React.Fragment>
          <div className="card-image">
            <figure className="image is-16by9 show-image">
              <img src={showApi.getShowPoster(show)} alt={show.name} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{show.name}</p>
                <div className="level">
                  <p className="level-left is-6">
                    {show.first_air_date && (
                      <time dateTime={show.first_air_date}>
                        {new Date(show.first_air_date).getFullYear()}
                      </time>
                    )}
                  </p>
                  <p className="level-right">{show.vote_average}</p>
                </div>
              </div>
            </div>

            <div className="content">
              <p className="show-description">{show.overview}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(ShowCard);
