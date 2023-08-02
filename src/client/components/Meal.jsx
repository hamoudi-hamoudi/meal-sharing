import React from "react";
import ReactDOM from "react-dom";
import "./meal.css";
import { Link } from "react-router-dom";
function Meal({ title, description, price, id }) {
  return (
    <div className="mealCard">
      <Link to={`/meals/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{description}</p>

      <p>{price}</p>
    </div>
  );
}
export default Meal;
