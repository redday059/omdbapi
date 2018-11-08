import React from "react";
import NavigationLink from "./NavLink";

export default () => {
  return (
    <nav>
      <ul>
        <li><NavigationLink to="/">OMDB API</NavigationLink></li>
        <li><NavigationLink to="/img">Images</NavigationLink></li>
      </ul>
    </nav>
  )
}
