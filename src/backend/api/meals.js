const express = require("express");
const router = express.Router();
const knex = require("../database");
const valid = require("./controller");
const {
  maxprice,
  availableReservations,
  mealTitle,
  mealsDates,
  limitedMeals,
  sortingMeals,
  mealReviews,
} = require("./advancedquerys");
const requiredColumns = [
  "title",
  "description",
  "location",
  "when",
  "max_reservations",
  "created_date",
  "price",
];
router
  .route("/")
  .get(async (req, res) => {
    let query = req.query;
    let meals;
    try {
      if (Object.keys(query).length !== 0) {
        if ("maxprice" in query) {
          const amount = Number(query.maxprice);
          meals = await maxprice(amount);
        }
        if ("availableReservations" in query) {
          const boolean = query.availableReservations.toLowerCase();
          meals = await availableReservations(boolean);
        }
        if ("title" in query) {
          const searchedTitle = query.title;
          meals = await mealTitle(searchedTitle);
        }
        if ("dateAfter" in query || "dateBefore" in query) {
          const data = Object.entries(query);
          meals = await mealsDates(data[0][0], data[0][1]);
        }
        if ("limit" in query) {
          const limit = query.limit;
          meals = await limitedMeals(Number(limit));
        }
        if ("sortKey" in query) {
          const column = query.sortKey;
          const sortBy = query.sortDir;
          if (sortBy) {
            meals = await sortingMeals(column, sortBy);
          } else {
            meals = await sortingMeals(column);
          }
        }
        return meals.length === 0
          ? res.status(200).json("no meal found")
          : res.status(200).json(meals);
      } else {
        meals = await knex("meal").select("title");
        res.status(200).json(meals);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    const addMeal = req.body;
    if (!valid(addMeal, requiredColumns)) {
      return res
        .status(404)
        .json("Missing required columns in the request body");
    } else {
      try {
        await knex("meal").insert(addMeal);
        res.status(201).json(`meal ${addMeal.title} added successfully`);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || !id) {
      res.status(404).json(` ${id} not valide please provide a number`);
    } else {
      try {
        const meal = await knex("meal").select("title").where({ id });
        meal.length === 0
          ? res.status(200).json("no meal with this id")
          : res.status(200).json(meal);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  })

  .put(async (req, res) => {
    const id = req.params.id;
    const updatedMeal = req.body;
    if (isNaN(id) || !valid(updatedMeal, requiredColumns)) {
      res.status(404).json(` not valide please provide a the right info`);
    } else {
      try {
        updatedMeal.id = id;
        const meal = await knex("meal").where({ id });
        if (meal.length === 0) res.status(200).json("meal not found");
        else {
          await knex("meal").where({ id }).update(updatedMeal);
          res
            .status(200)
            .json("Meal ${updatedMeal.title} updated successfully");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || !id) {
      res.status(404).json(` ${id} not valide please provide a number`);
    } else {
      try {
        const meal = await knex("meal").where({ id });
        if (meal.length === 0) res.status(200).json(`meal not found`);
        else {
          await knex("meal").where({ id }).del();
          res.status(200).json(`meal with id ${id} deleted successfully`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
router.get("/:meal_id/reviews", async (req, res) => {
  const id = req.params["meal_id"];
  if (isNaN(id) || !id || id === "meal_id") {
    return res.status(404).json(` ${id} not valide please provide a number`);
  } else {
    try {
      const review = await mealReviews(id);
      return review.length === 0
        ? res.status(200).json("no meal found or review found")
        : res.status(200).json(review);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
module.exports = router;
