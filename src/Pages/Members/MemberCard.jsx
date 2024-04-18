import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useStudents from "../../hooks/useStudents";
import { motion } from "framer-motion";
const MemberCard = ({ student }) => {
  const { student: userStudent } = useContext(AuthContext);
  const { std_id, name, photoURL, bio, facebook } = student;
  const { isLoading } = useStudents();
  return (
    <div
      data-aos="zoom-in"
      className="card w-72 md:w-72 min-h-[500px] bg-base-100 shadow-md">
      <figure>
        <img
          src={
            photoURL ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOa16XzcS705D4VAIkwi0z9UMPf-CxYJKD2R8I1kROgA&s"
          }
          alt="student"
          className="w-full h-72 object-cover "
        />
      </figure>
      <div className="card-body flex flex-col items-center justify-start">
        <h2 className="card-title text-primary text-center font-bold ">
          {name}
        </h2>
        <p className="text-base-content text-sm font-semibold text-center">
          {bio}
        </p>
        <div className="card-actions justify-center">
          {/* <a className="btn btn-primary text-white" href={facebook}>
            Connect
          </a> */}
          <Link
            to={`/member/${std_id}`}
            className="btn bg-primary hover:bg-primary/70 text-white border-none shadow-lg shadow-primary/50">
            Profile
          </Link>
          <a
            href={facebook}
            className="btn bg-secondary hover:bg-secondary/70 text-white border-none shadow-lg shadow-secondary/50">
            Connect
          </a>
          {userStudent?.isAdmin && (
            <Link
              to={`/editProfile/${std_id}`}
              className="btn bg-secondary text-white">
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
