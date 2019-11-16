import React from "react";
import "./ShowCard.scss";

const PhantomShowCard: React.FC = props => (
  <div className="suggestion card">
    <div className="loading-overlay"></div>
    <div className="card-image">
      <figure className="image is-16by9 show-image">
        <img src="/mayflower_klein.jpg" alt="Placeholder loading" />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">...</p>
          <div className="level">
            <p className="level-left is-6">2000 </p>
            <p className="level-right">7.8</p>
          </div>
        </div>
      </div>

      <div className="content">
        <p className="show-description">
          Tatatatatat ladlsapdl oigjoijasdoiaj jaio jdoajsd a. asdiojasd.
          aisodjoaiJSDiJDOIasn
        </p>
      </div>
    </div>
  </div>
);

export default React.memo(PhantomShowCard);
