import React from "react";
import ReactDOM from "react-dom";
import "./meal.css";
import { Link } from "react-router-dom";
import FindReview from "./FindReview";
import { IoPizzaOutline } from "react-icons/io5";

function Meal({ title, description, price, id, max_reservations }) {
  return (
    <div className="mealCard">
      <Link to={`/meals/${id}`}>
        <h2>
          <IoPizzaOutline /> {title}
        </h2>
        <div className="img">
          <img src={`https://source.unsplash.com/random?${title}`} />
        </div>
      </Link>
      <p>{description}</p>
      <p>
        <FindReview id={id} />
      </p>
      <p>{price}</p>
      <p>max reservations {max_reservations}</p>
    </div>
  );
}
export default Meal;
