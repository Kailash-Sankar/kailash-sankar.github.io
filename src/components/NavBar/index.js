import React from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./index.module.less";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
