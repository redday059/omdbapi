import React from "react";
import NavigationLink from "../NavLink";
import './style.css';

export default () => {
  return (
    <nav className="navigation">
      <ul className="navlist">
        <li className="navitem"><NavigationLink className="navlink" to="/">OMDB API</NavigationLink></li>
        <li className="navitem"><NavigationLink className="navlink" to="/img">Images</NavigationLink></li>
      </ul>
    </nav>
  )
}
