import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { MealsContext } from "../contexts/Mealscontext";
import Meal from "../components/Meal";
import Form from "../components/ReservationForm";
import "./reservation.css";

function Reservation() {
  const { mealId } = useParams();
  const [isAvaillable, setAvaillable] = useState(true);

  const data = useContext(MealsContext);
  const { meals } = data;
  if (!meals || meals.length === 0) {
    return <p>Loading meals data...</p>;
  }
  const meal = meals.find((meal) => {
    return meal.id.toString() === mealId;
  });
  if (!meal) {
    return <p>Meal not found or invalid Url provided.</p>;
  }
  const { max_reservations, title, id, description, price } = meal;
  if (max_reservations === 0) {
    setAvaillable(false);
  }

  return (
    <div className="meal-reservation">
      <div>
        <Meal
          title={title}
          price={`${price} €`}
          description={description}
          id={id}
          max_reservations={max_reservations}
        />
      </div>

      <div>
        {isAvaillable ? (
          <Form id={meal.id} />
        ) : (
          <p>no reservations availlable</p>
        )}
      </div>
    </div>
  );
}
export default Reservation;
