import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Meal from "../components/Meal";
import { MealsContext } from "../contexts/Mealscontext";
import "./mealList.css";

function Meals() {
  const meals = useContext(MealsContext);
  if (!meals || meals.length === 0) {
    return <p>Loading meals data...</p>;
  }
  const RenderMeals = meals.map((meal) => {
    return (
      <Meal
        key={meal.id}
        id={meal.id}
        title={meal.title}
        price={`${meal.price} €`}
        description={meal.description}
      />
    );
  });
  return <div className="meals">{RenderMeals}</div>;
}
export default Meals;
