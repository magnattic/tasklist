import React, { useContext } from "react";
import { Card } from "react-bootstrap";
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
    <Card
      className={`suggestion ${show === null ? " suggestion--loading" : ""}`}
      onClick={() => props.showClicked()}
    >
      {show && (
        <React.Fragment>
          <Card.Img
            src={showApi.getShowPoster(show)}
            variant={"top"}
          ></Card.Img>
          <Card.Body>
            <Card.Title>{show.name}</Card.Title>
            <div className="row">
              <div className="col-6">
                {show.first_air_date && (
                  <time dateTime={show.first_air_date}>
                    {new Date(show.first_air_date).getFullYear()}
                  </time>
                )}
              </div>
              <p className="col-6">{show.vote_average}</p>
            </div>
            <Card.Text className="show-description">{show.overview}</Card.Text>
          </Card.Body>
        </React.Fragment>
      )}
    </Card>
  );
};

export default React.memo(ShowCard);
