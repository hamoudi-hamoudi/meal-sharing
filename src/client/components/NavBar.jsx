import React from "react";
import ReactDOM from "react-dom";
import "./navBar.css";
import { Link } from "react-router-dom";
import {
  IoFastFoodOutline,
  IoBrushOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

function NavBar() {
  return (
    <nav className="nav">
      <Link to={"/"}>
        <p>
          <IoStorefrontOutline /> Home
        </p>
      </Link>
      <Link to={"/meals"}>
        <p>
          <IoFastFoodOutline /> Meals
        </p>
      </Link>
      <Link to={"/review"}>
        <p>
          <IoBrushOutline /> Review
        </p>
      </Link>
    </nav>
  );
}

export default NavBar;
