import React from "react";
import ReactDOM from "react-dom";
import "./navBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <Link to={"/meals"}>
        <p>Meals</p>
      </Link>
      <Link to={"/review"}>
        <p>Review</p>
      </Link>
    </nav>
  );
}

export default NavBar;
