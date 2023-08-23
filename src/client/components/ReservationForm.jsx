import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./form.css";
import axios from "axios";
import Modal from "../components/Modal";
import {
  IoPersonAddOutline,
  IoCallOutline,
  IoAtSharp,
  IoRestaurantOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

function Form({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reservation, setReservation] = useState({
    number_of_guests: 1,
    meal_id: id,
    created_date: "",
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });

  const createReservation = async (res) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reservations",
        res
      );
      if (response.status === 201) {
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
        setReservation({
          number_of_guests: 1,
          meal_id: id,
          created_date: "",
          contact_phonenumber: "",
          contact_name: "",
          contact_email: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const {
      number_of_guests,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = reservation;
    if (
      number_of_guests <= 0 ||
      !contact_phonenumber.trim() ||
      !contact_name.trim() ||
      !contact_email.trim()
    ) {
      console.log("fill up the form");
    } else {
      createReservation(reservation);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;

    setReservation((prev) => ({
      ...prev,
      [name]: value,
      created_date: new Date().toLocaleDateString("en-CA"),
    }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <IoPersonAddOutline /> Guests
        </label>
        <input
          type="number"
          name="number_of_guests"
          value={reservation.number_of_guests}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <IoPersonCircleOutline /> name
        </label>
        <input
          type="text"
          name="contact_name"
          value={reservation.contact_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <IoAtSharp /> email
        </label>
        <input
          type="email"
          name="contact_email"
          value={reservation.contact_email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <IoCallOutline /> phone
        </label>
        <input
          type="tel"
          name="contact_phonenumber"
          value={reservation.contact_phonenumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">
          Submit <IoRestaurantOutline />
        </button>
      </div>
      <Modal isOpen={isOpen} text={true} />
    </form>
  );
}

export default Form;
