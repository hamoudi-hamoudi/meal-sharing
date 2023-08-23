const knex = require("../database");

const maxprice = async (amount) =>
  await knex("meal").select("title", "price").where("price", "<", amount);

const availableReservations = async (boolean) => {
  if (boolean === "true") {
    return await knex("meal")
      .select("title", "max_reservations", "number_of_guests")
      .join("reservation", "meal.id", "=", "reservation.meal_id")
      .where("max_reservations", ">", "number_of_guests");
  } else if (boolean === "false") {
    return await knex("meal")
      .select("title", "max_reservations", "number_of_guests")
      .join("reservation", "meal.id", "=", "reservation.meal_id")
      .where("max_reservations", "=", "number_of_guests");
  } else {
    return "please provide the right query parameters";
  }
};

const mealTitle = async (title) => {
  let meals;
  if (!title) meals = await knex("meal");
  else {
    meals = await knex("meal").where("title", "like", `%${title}%`);
  }

  return meals;
};

const mealsDates = async (when, time) => {
  if (when === "dateAfter") {
    return await knex("meal").where("when", ">", time);
  } else if (when === "dateBefore") {
    return await knex("meal").where("when", "<", time);
  } else {
    return "please provide the right query parameters";
  }
};
const limitedMeals = async (nb) => {
  return await knex.select("*").from("meal").limit(nb);
};

const sortingMeals = async (column, sortBy, meals) => {
  if (!column || !sortBy) return meals;
  else {
    return await knex("meal").orderBy(column, sortBy);
  }
};
const mealReviews = async (id) => {
  return await knex("meal")
    .select("meal.title", "review.stars", "review.description")
    .join("review", "meal.id", "=", "review.meal_id")
    .where("meal.id", "=", `${id}`);
};

module.exports = {
  maxprice,
  availableReservations,
  mealTitle,
  mealsDates,
  limitedMeals,
  sortingMeals,
  mealReviews,
};
