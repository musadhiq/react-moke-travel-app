import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Location.css";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../../axiosConfig";
import Nav from "../includes/Nav";

export default function Location() {
  const [location, setLocation] = useState([]);
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${BASE_URL}view/${id}/`)
      .then(function (response) {
        setLocation(response.data.data);
        setGallery(response.data.data.gallery);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  let renderGallery = () => {
    return gallery.map((image) => (
      <img key={image.id} src={image.image} alt="" />
    ));
  };
  return (
    <>
      <Helmet>
        <title>{`${location.name}`}</title>
      </Helmet>
      <Nav />
      <div className="wrapper">
        <div className="main">
          <div className="head">
            <h1>{location.name}</h1>
            <div className="bott">
              <button>{location.category_name}</button>
              <img src={require("../assets/images/place.svg").default} alt="" />
              <span>{location.location}</span>
            </div>
          </div>
          <div className="gallery">
            <div className="main-img">
              <img src={location.image} alt="" />
            </div>
            {gallery && <div className="more">{renderGallery()}</div>}
          </div>
          <div className="bottom">
            <h1>Place Details</h1>
            <p>{location.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
