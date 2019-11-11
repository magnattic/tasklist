import { A } from "hookrouter";
import React from "react";

export const NavBar: React.FC<{}> = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <A className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </A>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <A className="navbar-item" href="/">
            Tasks
          </A>

          <A className="navbar-item" href="/shows">
            Shows
          </A>
          <A className="navbar-item" href="/about">
            Imprint
          </A>
        </div>
      </div>
    </nav>
  );
};
