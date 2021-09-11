import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Locations.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../axiosConfig";
import Nav from "../includes/Nav";
import { UserContext } from "../../App";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then(function (response) {
        setLocations(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  let renderItems = () => {
    return locations.map((location) => (
      <Link
        to={userData ? `/location/${location.id}` : `/auth/login`}
        key={location.id}
      >
        <div className="item">
          <div className="top">
            <img src={location.image} alt="" />
          </div>
          <div className="middle">
            <h3>{location.name} </h3>
          </div>
          <div className="bottom">
            <img src={require("../assets/images/place.svg").default} alt="" />
            <span>{location.location}</span>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <>
      <Nav />
      <div className="wrapper">
        <div className="head ">
          <h2>Welcome</h2>
          <p>Explore the world around you</p>
        </div>
        <div className="items ">{renderItems()}</div>
      </div>
    </>
  );
}
