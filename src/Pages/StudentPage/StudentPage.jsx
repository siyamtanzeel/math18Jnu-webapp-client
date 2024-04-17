import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FcPhone, FcHome } from "react-icons/fc";
import { FaDroplet, FaScrewdriverWrench } from "react-icons/fa6";
import { TbBus } from "react-icons/tb";
import { GiVillage } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";

const UserPage = () => {
  const userData = useLoaderData();
  const {
    photoURL,
    name,
    bio,
    description,
    college,
    phone,
    std_id,
    telegram,
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
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal absolute" role="dialog">
        <div className="modal-box w-76 flex items-center justify-center absolute top-20 lg:left-auto">
          <img src={photoURL} alt="" className="w-72 h-full object-contain" />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* The button to open modal */}
        <label htmlFor="my_modal_7" className="">
          <img
            src={photoURL}
            alt=""
            className="w-64 h-64 rounded-full object-cover"
          />
        </label>

        <h1 className="text-primary text-2xl font-semibold">{name}</h1>
        <p className="text-base-content font-bold">{bio}</p>
        <div className="flex items-center justify-center space-x-2">
          <a
            href={facebook}
            className="btn btn-primary text-white border-none shadow-lg shadow-primary/50">
            Connect
          </a>
          <Link
            to={`/editProfile/${std_id}`}
            className="btn bg-rose-500 hover:bg-rose-800 text-white border-none shadow-lg shadow-secondary/50">
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-16 ">
        <div className="overflow-x-auto rounded-lg">
          <h3 className="font-semibold text-center text-primary pt-3">
            Information
          </h3>
          <div className="divider"></div>
          <table className="table table-zebra md:text-lg">
            {/* head */}

            <tbody>
              {/* row 1 */}
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  <IoSchool className="text-black mr-2"></IoSchool> College
                </td>
                <td>{college}</td>
              </tr>
              {/* row 2 */}
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <FcHome className="mr-2"></FcHome> Present Address
                </td>
                <td>{present_address}</td>
              </tr>
              {/* row 3 */}
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <GiVillage className="text-teal-600 mr-2"></GiVillage>
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
                  <FaScrewdriverWrench className="text-gray-900 mr-2"></FaScrewdriverWrench>
                  Skills
                </td>
                <td>{skills}</td>
              </tr>
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  {" "}
                  <TbBus className="text-red-700 mr-2"></TbBus>
                  Varsity Bus
                </td>
                <td className="">{varsity_bus}</td>
              </tr>
              <tr className="shadow-md">
                <td className="text-primary font-bold flex items-center">
                  <FcPhone className="mr-2"></FcPhone> Phone
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
