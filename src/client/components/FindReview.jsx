import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { MealsContext } from "../contexts/Mealscontext";
import { GoStarFill } from "react-icons/go";

function FindReview({ id }) {
  const data = useContext(MealsContext);

  const reviews = data.reviews;
  const getReviewForMeal = (mealId) => {
    return reviews.filter((e) => {
      return e.meal_id === mealId;
    });
  };

  const AverageStars = (array) => {
    if (array.length === 0) {
      return "No reviews for this meal yet";
    }
    const average = array.reduce((total, num) => total + num, 0) / array.length;

    return `${array.length} views, Average ${average.toFixed(0)}`;
  };
  const mealReview = getReviewForMeal(id);
  const reviewStars = mealReview.map((review) => review.stars);
  return (
    <>
      {AverageStars(reviewStars)} <GoStarFill />
    </>
  );
}
export default FindReview;
