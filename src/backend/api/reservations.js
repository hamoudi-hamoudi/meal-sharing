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
router
  .route("/")
  .get(async (req, res) => {
    try {
      const reservations = await knex("reservation");
      res.status(200).json(reservations);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    const addReservation = req.body;
    if (!valid(addReservation, requiredColumns)) {
      return res
        .status(404)
        .json("Missing required columns in the request body");
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
router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(404).json(` ${id} not valide please provide a number`);
    } else {
      try {
        const reservation = await knex("reservation").where({ id });
        reservation.length === 0
          ? res.status(404).json("no matching reservation")
          : res.status(200).json(reservation);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const updatedReservation = req.body;
    if (isNaN(id) || !valid(updatedReservation, requiredColumns)) {
      res.status(404).json(` ${id} not valide please provide a the right info`);
    } else {
      try {
        updatedReservation.id = id;
        const reservation = await knex("Reservation").where({ id });
        if (reservation.length === 0) {
          res.status(404).json(`Reservation not found`);
        } else {
          await knex("Reservation").where({ id }).update(updatedReservation);
          res
            .status(200)
            .json(
              `Reservation with id ${updatedReservation.id} updated successfully`
            );
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
        const reservation = await knex("reservation").where({ id });
        if (reservation.length === 0) {
          res.status(404).json(`Reservation not found`);
        } else {
          await knex("reservation").where({ id }).del();
          res
            .status(200)
            .json(`reservation with id ${id} deleted successfully`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
module.exports = router;
