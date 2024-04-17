import React from "react";
import HomeCarousel from "./Carousel/HomeCarousel";
import Banner from "./Banner/Banner";
import Gallery from "../Gallery/Gallery";
import AboutUs from "./AboutUs/AboutUs";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <div className="relative text-primary">
        <Helmet>
          <title>Home - Eccentric-18</title>
        </Helmet>
        <HomeCarousel></HomeCarousel>
        <Banner></Banner>
      </div>
      <Gallery></Gallery>
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;
