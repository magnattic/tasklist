import React from "react";
import "./ShowCard.scss";
import "./PhantomShowCard.scss";

const PhantomShowCard: React.FC = props => (
  <div className="suggestion card phantom-card">
    <div className="card-image">
      <figure className="image is-16by9 show-image">
        <img src="/dummy.jpg" alt="Placeholder loading" />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">Lost Girl</p>
          <div className="level">
            <p className="level-left is-6">2000 </p>
            <p className="level-right">7.8</p>
          </div>
        </div>
      </div>

      <div className="content">
        <p className="show-description">
          Lost Girl focuses on the gorgeous and charismatic Bo, a supernatural
          being called a succubus who feeds on the energy of humans, sometimes
          with fatal results. Refusing to embrace her supernatural clan and its
          rigid hierarchy, Bo is a renegade who takes up the fight for the
          underdog while searching for the truth about her own mysterious
          origins.
        </p>
      </div>
    </div>
  </div>
);

export default React.memo(PhantomShowCard);
