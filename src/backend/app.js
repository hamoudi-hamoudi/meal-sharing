const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("./database");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewRouter = require("./api/reviews");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewRouter);

// nodejs week1
// Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal WHERE `when` > now()");
    res.status(200).json(meals[0]);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal WHERE `when` < now()");
    res.status(200).json(meals[0]);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal");
    res.status(200).json(meals[0]);
  } catch (e) {
    res.status(500).json(e);
  }
});
//Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM meal ORDER BY id ASC limit 1");
    if (meal[0].length > 0) {
      res.status(200).json(meal[0][0]);
    } else {
      res.status(404).json("there are no meals");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// 	Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM meal ORDER BY id desc limit 1");
    if (meal[0].length > 0) {
      res.status(200).json(meal[0][0]);
    } else {
      res.status(404).json("there are no meals");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
