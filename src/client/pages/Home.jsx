import React from "react";
import ReactDOM from "react-dom";
import Footer from "../components/Footer";
import "./home.css";
import { Link } from "react-router-dom";
import hyf from "../assets/images/hyf.png";
import { IoFastFoodOutline } from "react-icons/io5";
function Home() {
  return (
    <>
      <header className="header">
        <img src={hyf} alt=" hyf" />
        <h1 className="headline">Meal-Sharing</h1>
      </header>
      <div className="content">
        <p className="intro">
          we offer a delightful dining experience like no other. Whether you're
          looking for a romantic dinner for two or a fun-filled gathering with
          friends, our diverse menu and warm ambiance are sure to exceed your
          expectations. <br />
          Book your table now that the exprience will leave you with cherished
          memories. creating an extraordinary dining experience for you and your
          loved ones. <b>Bon appétit!</b> <br />
          <button className="to-meals">
            <Link to={"/meals"}>
              <IoFastFoodOutline /> go to meals
            </Link>
          </button>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Home;
