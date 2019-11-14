import { A } from "hookrouter";
import React from "react";

export const NavBar: React.FC<{}> = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <A className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Logo"
            width="112"
            height="28"
          />
        </A>

        <div
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <A href="/" className="navbar-item">
            Home
          </A>

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
