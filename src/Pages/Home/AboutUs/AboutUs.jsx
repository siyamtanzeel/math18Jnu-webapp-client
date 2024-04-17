import React from "react";
import Title from "../../../Components/Title";

const AboutUs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center py-16 px-3 ">
      <img
        src="/public/img/home-bg.png"
        alt=""
        className="w-80 md:w-[460px] mx-auto"
        data-aos="fade-down"
      />
      <div
        className="flex flex-col items-center justify-center space-y-5 mt-10 md:mt-0"
        data-aos="fade-up">
        <Title>Who are we</Title>
        <p className=" text-base-content text-justify max-w-[400px] px-3">
          Welcome to the official web app dedicated to the{" "}
          <span className="text-warning font-semibold">18th batch</span> of the{" "}
          <span className="text-warning font-semibold">
            Department of Mathematics
          </span>{" "}
          at{" "}
          <span className="text-warning font-semibold">
            Jagannath University
          </span>
          ! Officially starting our journey in{" "}
          <span className="text-warning font-semibold">2023</span>, our batch is
          a vibrant community of talented individuals passionate about
          mathematics and academic excellence. Throughout our journey, we've
          achieved significant milestones and formed lasting friendships. Here,
          you'll find updates on batch events, academic resources, and
          opportunities for engagement. Join us as we continue to thrive and
          make our mark in the world of mathematics!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
