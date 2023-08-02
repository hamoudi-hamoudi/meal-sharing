import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const getMeals = await axios.get("http://localhost:3000/api/meals");
      setMeals(getMeals.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <MealsContext.Provider value={meals}>{children}</MealsContext.Provider>
  );
};
