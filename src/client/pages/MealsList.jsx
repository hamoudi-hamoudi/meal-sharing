import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Meal from "../components/Meal";
import { MealsContext } from "../contexts/Mealscontext";
import "./mealList.css";
import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";

function Meals() {
  const data = useContext(MealsContext);
  const { meals, setSearchTerm, setSortBy } = data;
  useEffect(() => {
    setSearchTerm(null);
  }, []);
  if (!meals) {
    return <p>Loading meals data...</p>;
  }
  const handleRadioChange = (e) => {
    setSortBy((prev) => ({ ...prev, direction: e.target.value }));
  };
  const RenderMeals = meals.map((meal) => {
    return (
      <Meal
        key={meal.id}
        id={meal.id}
        title={meal.title}
        price={`${meal.price} €`}
        description={meal.description}
        max_reservations={meal.max_reservations}
      />
    );
  });
  return (
    <div>
      <div className="form-container">
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => {
              setSortBy({
                column: "",
                direction: "",
              });
              setSearchTerm(e.target.value);
            }}
            placeholder="search"
          />
        </div>
        <div className="sort-by">
          <select onChange={(e) => setSortBy({ column: e.target.value })}>
            <option>sort by</option>
            <option value={"price"}>price</option>
            <option value={"max_reservations"}>max reservation</option>
            <option value={"when"}>when</option>
          </select>
        </div>
        <div className="radio-buttons">
          <label>
            <FcNumericalSorting12 />
            <input
              type="radio"
              name="direction"
              value={"asc"}
              onChange={handleRadioChange}
            />
          </label>

          <label>
            <FcNumericalSorting21 />
            <input
              type="radio"
              name="direction"
              value={"desc"}
              onChange={handleRadioChange}
            />
          </label>
        </div>
      </div>
      <div className="meals">{RenderMeals} </div>
      {meals.length === 0 && <p>no meal found</p>}
    </div>
  );
}
export default Meals;
