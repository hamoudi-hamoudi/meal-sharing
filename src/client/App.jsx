import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Meals from "./pages/MealsList";
import Review from "./pages/Review";
import { MealsProvider } from "./contexts/Mealscontext";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <MealsProvider>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/meals">
          <Meals />
        </Route>
        <Route path="/meals/:mealId">
          <Reservation />
        </Route>
        <Route exact path="/review">
          <Review />
        </Route>
      </BrowserRouter>
    </MealsProvider>
  );
}

export default App;
