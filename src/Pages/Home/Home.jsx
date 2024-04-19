import React from "react";
import HomeCarousel from "./Carousel/HomeCarousel";
import Banner from "./Banner/Banner";
import Gallery from "../Gallery/Gallery";
import AboutUs from "./AboutUs/AboutUs";
import { Helmet } from "react-helmet-async";
import Announcements from "./Announcements/Announcements";

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
      {/* <Announcements></Announcements> */}
      <AboutUs></AboutUs>
      <Gallery></Gallery>
    </div>
  );
};

export default Home;
