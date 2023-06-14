const express = require("express");
const router = express.Router();
const knex = require("../database");
const valid = require("./controller");

const requiredColumns = [
  "number_of_guests",
  "meal_id",
  "created_date",
  "contact_phonenumber",
  "contact_name",
  "contact_email",
];
router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation");
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  const addReservation = req.body;
  if (!valid(addReservation, requiredColumns)) {
    return res.status(404).json("Missing required columns in the request body");
  } else {
    try {
      const meal = await knex("reservation").insert(addReservation);
      res
        .status(201)
        .json(
          `reservation ${addReservation.contact_name} with id ${meal} added successfully`
        );
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
      const reservation = await knex("reservation").where({ id });
      reservation.length === 0
        ? res.status(200).json("no matching reservation")
        : res.status(200).json(reservation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedReservation = req.body;
  if (isNaN(id) || !valid(updatedReservation, requiredColumns)) {
    res.status(404).json(` ${id} not valide please provide a number`);
  } else {
    try {
      updatedReservation.id = id;
      const reservation = await knex("Reservation").where({ id });
      reservation.length === 0
        ? res.status(200).json(`Reservation not found`)
        : (await knex("Reservation")
            .where({ id })
            .update(updatedReservation)) &&
          res
            .status(200)
            .json(
              `Reservation with id ${updatedReservation.id} updated successfully`
            );
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
      const reservation = await knex("reservation").where({ id });
      reservation.length === 0
        ? res.status(200).json(`reservation not found`)
        : (await knex("reservation").where({ id }).del()) &&
          res
            .status(200)
            .json(`reservation with id ${id} deleted successfully`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
module.exports = router;
