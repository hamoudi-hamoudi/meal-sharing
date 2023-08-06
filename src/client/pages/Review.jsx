import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import ReviewForm from "../components/ReviewForm";
import { MealsContext } from "../contexts/Mealscontext";
import "./review.css";

function Review() {
  const data = useContext(MealsContext);
  const meals = data.meals;
  const [selectedId, setSelectedId] = useState(null);
  const RenderMeal = meals.map((meal, index) => {
    return (
      <option key={index} value={meal.id}>
        {meal.title}
      </option>
    );
  });

  function handleSelect(e) {
    setSelectedId(e.target.value);
  }

  return (
    <>
      <select onChange={handleSelect}>
        <option value="">Select a meal</option>
        {RenderMeal}
      </select>
      {selectedId ? <ReviewForm id={selectedId} /> : null}
    </>
  );
}
export default Review;
