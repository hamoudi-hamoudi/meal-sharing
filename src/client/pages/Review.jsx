import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReviewForm from "../components/ReviewForm";
import { MealsContext } from "../contexts/Mealscontext";
import "./review.css";

function Review() {
  const data = useContext(MealsContext);
  const { meals, setSearchTerm, reviews } = data;
  const [selectedId, setSelectedId] = useState(null);
  const RenderMeal = meals.map((meal, index) => {
    return (
      <option key={index} value={meal.id}>
        {meal.title}
      </option>
    );
  });
  useEffect(() => {
    setSearchTerm(null);
  }, []);
  function handleSelect(e) {
    setSelectedId(e.target.value);
  }

  const findReviewsForThisMeals = reviews.filter(
    (e) => e.meal_id.toString() === selectedId
  );

  const RenderReviewsForThisMeals = findReviewsForThisMeals.map((e) => {
    return (
      <div key={e.id} className="review-card">
        <p>
          <strong> {e.title}</strong>
        </p>
        <p>{e.description}</p>
      </div>
    );
  });

  return (
    <div>
      <select onChange={handleSelect}>
        <option value="">Select a meal</option>
        {RenderMeal}
      </select>
      {selectedId ? <ReviewForm id={selectedId} /> : null}
      <div>{RenderReviewsForThisMeals}</div>
    </div>
  );
}
export default Review;
