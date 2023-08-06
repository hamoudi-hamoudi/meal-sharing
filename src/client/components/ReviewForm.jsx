import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./form.css";
import axios from "axios";
import Modal from "../components/Modal";
import {
  IoSparklesOutline,
  IoCreate,
  IoThumbsUpOutline,
  IoBrushOutline,
} from "react-icons/io5";

function ReviewForm({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState({
    title: "",
    description: "",
    meal_id: null,
    created_date: "",
    stars: 5,
  });

  const createReview = async (res) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reviews",
        res
      );

      if (response.status === 201) {
        setIsOpen(true);
        setReview({
          title: "",
          description: "",
          meal_id: null,
          stars: 5,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = review;
    if (!title.trim() || !description.trim()) {
      console.log("fill up the form");
    } else {
      createReview(review);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;

    setReview((prev) => ({
      ...prev,
      [name]: value,
      meal_id: id,
      created_date: new Date().toLocaleDateString("en-CA"),
    }));
  }
  console.log(review);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <IoBrushOutline /> title
        </label>
        <input
          type="text"
          name="title"
          value={review.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <IoCreate /> description
        </label>
        <textarea
          type="text"
          name="description"
          value={review.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>
          <IoSparklesOutline /> how many stars
        </label>
        <input
          type="number"
          name="stars"
          min={0}
          max={5}
          value={review.stars}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">
          Submit <IoThumbsUpOutline />
        </button>
      </div>
      <Modal isOpen={isOpen} />
    </form>
  );
}

export default ReviewForm;
