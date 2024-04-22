import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FcPhone, FcHome } from "react-icons/fc";
import { FaDroplet, FaSchool, FaScrewdriverWrench } from "react-icons/fa6";
import { TbBus } from "react-icons/tb";
import { GiVillage } from "react-icons/gi";
import { IoHome, IoSchool } from "react-icons/io5";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LightGallery from "lightgallery/react";
import { FaHome, FaPhone } from "react-icons/fa";

const UserPage = () => {
  const userData = useLoaderData();
  const onInit = () => {
    console.log("light gallery initialized");
  };
  const {
    photoURL,
    name,
    bio,
    description,
    college,
    phone,
    std_id,
    facebook,
    skills,
    blood_group,
    present_address,
    varsity_bus,
    home_district,
  } = userData;
  console.log(userData);

  return (
    <div className="px-3 py-5 bg-base-300/50 flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center space-y-3">
        <LightGallery
          onInit={onInit}
          speed={500}
          elementClassNames="flex items-center justify-center"
          plugins={[lgThumbnail, lgZoom]}>
          <a href={photoURL || "/img/userIcon.png"} data-aos="zoom-in">
            <img
              src={photoURL || "/img/userIcon.png"}
              alt={name}
              className="w-64 h-64 rounded-full object-cover"
            />
          </a>
        </LightGallery>
        <h1 className="text-primary text-2xl font-semibold">{name}</h1>
        <p className="text-base-content font-bold">{bio}</p>
        <p className="text-secondary font-bold">{userData?.role}</p>
        <div className="flex items-center justify-center space-x-2">
          <a
            href={facebook}
            className="btn btn-secondary text-white border-none shadow-lg shadow-secondary/50">
            Connect
          </a>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-16 ">
        <div className="overflow-x-auto rounded-lg">
          <h3 className="font-semibold text-center text-primary pt-3">
            Information
          </h3>
          <div className="divider"></div>
          <table className="table  font-semibold">
            {/* head */}

            <tbody>
              {/* row 1 */}
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  <FaSchool className="mr-2"></FaSchool> College
                </td>
                <td>{college}</td>
              </tr>
              {/* row 2 */}
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <FaHome className="mr-2"></FaHome> Present Address
                </td>
                <td>{present_address}</td>
              </tr>
              {/* row 3 */}
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <GiVillage className=" mr-2"></GiVillage>
                  Home District
                </td>
                <td>{home_district}</td>
              </tr>
              <tr className="shadow-md">
                <td className="text-rose-600 font-bold flex items-center">
                  {" "}
                  <FaDroplet className="text-rose-600 mr-2"></FaDroplet>Blood
                  Group
                </td>
                <td className="font-bold text-rose-600">{blood_group}</td>
              </tr>
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <FaScrewdriverWrench className=" mr-2"></FaScrewdriverWrench>
                  Skills
                </td>
                <td>{skills}</td>
              </tr>
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <TbBus className=" mr-2"></TbBus>
                  Varsity Bus
                </td>
                <td className="">{varsity_bus}</td>
              </tr>
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  <FaPhone className="mr-2"></FaPhone> Phone
                </td>
                <td className="">{phone || "Not Available"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <h3 className="font-semibold text-center text-primary pt-3">
            Description
          </h3>
          <div className="divider"></div>
          <p className="md:text-lg">
            {description && description.length > 30
              ? description
              : `Hello! I'm ${name}, a dedicated member of Jagannath University's Mathematics 18th Batch. I thrive on unraveling the mysteries of mathematics and embracing its challenges head-on. With a passion for problem-solving, I constantly seek to expand my knowledge and skills in the field. Whether it's tackling complex equations or delving into theoretical concepts, I approach each task with enthusiasm and determination. Beyond academics, I actively engage in extracurricular activities, fostering a well-rounded education. As a proud member of the Mathematics 18th Batch, I am committed to making meaningful contributions to both my academic community and society at large.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
