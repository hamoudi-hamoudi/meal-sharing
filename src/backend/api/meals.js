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
    const { title, column, direction } = query;
    try {
      meals = await mealTitle(title);
      meals = await sortingMeals(column, direction, meals);
      res.status(200).json(meals);
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
    if (isNaN(id)) {
      res.status(404).json(` ${id} not valide please provide a number`);
    } else {
      try {
        const meal = await knex("meal").select("title").where({ id });
        meal.length === 0
          ? res.status(404).json("no meal with this id")
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
        if (meal.length === 0) res.status(404).json("meal not found");
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
    if (isNaN(id)) {
      res.status(404).json(` ${id} not valide please provide a number`);
    } else {
      try {
        const meal = await knex("meal").where({ id });
        if (meal.length === 0) res.status(404).json(`meal not found`);
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
  if (isNaN(id)) {
    return res.status(404).json(` ${id} not valide please provide a number`);
  } else {
    try {
      const review = await mealReviews(id);
      return review.length === 0
        ? res.status(404).json("no meal found or review found")
        : res.status(200).json(review);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
module.exports = router;
