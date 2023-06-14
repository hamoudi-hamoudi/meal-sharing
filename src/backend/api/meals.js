const express = require("express");
const router = express.Router();
const knex = require("../database");
const valid = require("./controller");
const requiredColumns = [
  "title",
  "description",
  "location",
  "when",
  "max_reservations",
  "created_date",
  "price",
];

router.get("/", async (req, res) => {
  try {
    const meals = await knex("meal").select("title");
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  const addMeal = req.body;
  if (!valid(addMeal, requiredColumns)) {
    return res.status(404).json("Missing required columns in the request body");
  } else {
    try {
      await knex("meal").insert(addMeal);
      res.status(201).json(`meal ${addMeal.title} added successfully`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
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
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedMeal = req.body;
  if (isNaN(id) || !valid(updatedMeal, requiredColumns)) {
    res.status(404).json(` ${id} not valide please provide a number`);
  } else {
    try {
      updatedMeal.id = id;
      const meal = await knex("meal").where({ id });
      meal.length === 0
        ? res.status(200).json(`meal not found`)
        : (await knex("meal").where({ id }).update(updatedMeal)) &&
          res
            .status(200)
            .json(`meal ${updatedMeal.title} updated successfully`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(404).json(` ${id} not valide please provide a number`);
  } else {
    try {
      const meal = await knex("meal").where({ id });
      meal.length === 0
        ? res.status(200).json(`meal not found`)
        : (await knex("meal").where({ id }).del()) &&
          res.status(200).json(`meal with id ${id} deleted successfully`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
