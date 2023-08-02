import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./reservationForm.css";
import axios from "axios";
import Modal from "../components/Modal";

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
    console.log(reservation);
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
        <label>Guests</label>
        <input
          type="number"
          name="number_of_guests"
          value={reservation.number_of_guests}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>name</label>
        <input
          type="text"
          name="contact_name"
          value={reservation.contact_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>email</label>
        <input
          type="email"
          name="contact_email"
          value={reservation.contact_email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>phone</label>
        <input
          type="tel"
          name="contact_phonenumber"
          value={reservation.contact_phonenumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
      <Modal isOpen={isOpen} />
    </form>
  );
}

export default Form;
