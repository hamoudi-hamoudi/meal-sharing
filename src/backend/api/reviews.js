const express = require("express");
const router = express.Router();
const knex = require("../database");
const valid = require("./controller");

const requiredCollumns = [
  "title",
  "description",
  "meal_id",
  "stars",
  "created_date",
];

router
  .route("/")
  .get(async (req, res) => {
    const reviews = await knex("*").from("review");
    res.send(reviews);
  })

  .post(async (req, res) => {
    const addReview = req.body;
    if (!valid(addReview, requiredCollumns)) {
      return res.status(404).json(` please provide the right collumns info`);
    } else {
      try {
        await knex("review").insert(addReview);
        res.status(201).json(`review added successfully`);
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
        const review = await knex("review").where({ id });
        review.length === 0
          ? res.status(404).json("no matching review")
          : res.status(200).json(review);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const updatedreview = req.body;
    if (isNaN(id) || !valid(updatedreview, requiredCollumns)) {
      res.status(404).json(` ${id} not valide please provide a the right info`);
    } else {
      try {
        updatedreview.id = id;
        const review = await knex("review").where({ id });
        if (review.length === 0) {
          res.status(404).json(`review with this id not found`);
        } else {
          await knex("review").where({ id }).update(updatedreview);
          res
            .status(200)
            .json(`review with id ${updatedreview.id} updated successfully`);
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
        const review = await knex("review").where({ id });
        if (review.length === 0) {
          res.status(404).json(`review not found`);
        } else {
          await knex("review").where({ id }).del();
          res.status(200).json(`review with id ${id} deleted successfully`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });

module.exports = router;
