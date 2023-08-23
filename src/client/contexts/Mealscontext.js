import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [sortBy, setSortBy] = useState({
    column: "",
    direction: "",
  });

  const fetchMeals = async () => {
    try {
      const getMeals = await axios.get("http://localhost:3000/api/meals", {
        params: {
          title: searchTerm,
          column: sortBy.column,
          direction: sortBy.direction,
        },
      });

      setMeals(getMeals.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMeals();
    ftechReview();
  }, [searchTerm, sortBy]);

  const ftechReview = async () => {
    try {
      const getReviews = await axios.get(`http://localhost:3000/api/reviews`);
      setReviews(getReviews.data);
    } catch (err) {
      console.log(err);
    }
  };
  const value = { meals, reviews, setSearchTerm, setSortBy };
  return (
    <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
  );
};
