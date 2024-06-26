import React, { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../Firebase/firebase.config";
import { signOut } from "firebase/auth";
import useStudents from "../hooks/useStudents";
import "./Navbar.css";
import { DarkModeContext } from "../Providers/DarkModeProvider";
import Swal from "sweetalert2";
import { GrResources } from "react-icons/gr";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  console.log(darkMode);
  const axiosSecure = useAxiosSecure();
  const { user, setUser, student, authLoading, setAuthLoading, setStudent } =
    useContext(AuthContext);
  const { data, isLoading } = useStudents();
  const signOutHandler = () => {
    setAuthLoading(true);
    signOut(auth).then(() => {
      axiosSecure.post("/logout", {}).then((res) => console.log(res.data));
      setAuthLoading(false);
      setStudent(null);
      setUser(null);
      Swal.fire({
        title: "Successfuly Logged Out",
        icon: "success",
      });
    });
  };
  return (
    <div className="navbar bg-base-100/90 text-base-content sticky top-0 z-50 rounded-b-lg bg-opacity-80 backdrop-blur-md max-h-16 shadow-lg">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="drawer lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="drawer-button">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"></label>
            <ul
              tabIndex={0}
              className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
              <li>
                <NavLink className="navlink" to="/">
                  <FaHome className="mr-1 text-lg"></FaHome> Home
                </NavLink>
              </li>

              <li className="">
                <a>
                  <IoIosPeople className="mr-1 text-lg"></IoIosPeople> Members (
                  {isLoading ? "" : data.length})
                </a>
                <ul className="p-2">
                  <li>
                    <NavLink to="/members">All</NavLink>
                  </li>
                  <li>
                    <NavLink to="/committee">Committee</NavLink>
                  </li>
                  <li>
                    <NavLink to="/findByBlood">By Blood</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/resources">
                  {" "}
                  <GrResources className="mr-2 text-lg"></GrResources>Resources
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">
                  {" "}
                  <RiDashboardFill />
                  Dashboard
                </NavLink>
              </li>
              {/* Dark Mode Controller */}
              <li className=" mt-10">
                <label className="swap swap-rotate ">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="theme-controller w-full"
                    value="dark"
                    onClick={() => {
                      darkMode
                        ? localStorage.setItem("theme", "light")
                        : localStorage.setItem("theme", "dark");
                      setDarkMode(!darkMode);
                    }}
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-off fill-current w-6 h-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="dropdown"></div>
        <div>
          <Link to="/">
            <img
              src={
                darkMode
                  ? "/img/eccentric18logo-white.png"
                  : "/img/eccentric18logo-black.png"
              }
              alt=""
              className="w-16"
            />
          </Link>
        </div>
      </div>
      {/* desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            {/* Dark Mode Controller */}
            <label className="swap swap-rotate ">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
                onClick={() => {
                  darkMode
                    ? localStorage.setItem("theme", "light")
                    : localStorage.setItem("theme", "dark");
                  setDarkMode(!darkMode);
                }}
              />

              {/* sun icon */}
              <svg
                className="swap-off fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </li>
          <li>
            <NavLink className="navlink" to="/">
              <FaHome className="mr-1 text-lg"></FaHome> Home
            </NavLink>
          </li>
          <li>
            <details>
              <summary>
                <IoIosPeople className="mr-1 text-lg"></IoIosPeople> Members (
                {isLoading ? "" : data.length})
              </summary>
              <ul className="p-2 text-base-content bg-base-100">
                <li>
                  <NavLink to="/members">All</NavLink>
                </li>
                <li>
                  <NavLink to="/committee">Committee</NavLink>
                </li>
                <li>
                  <NavLink to="/findByBlood">By Blood</NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/resources">
              <GrResources className="mr-2 text-lg"></GrResources>Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <RiDashboardFill />
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        {authLoading ? (
          <div className="w-16 h-16 rounded-full skeleton shrink-0"></div>
        ) : student ? (
          // User Photo and Menu
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-12 h-12 rounded-full m-1">
              <img
                src={student?.photoURL}
                alt=""
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            {/* User Menu Dropdown content */}
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
              <li
                className={`text-black text-center my-2 text-lg font-semibold
                  ${darkMode ? "text-white" : "text-black"}`}>
                {student?.name}
              </li>
              <li>
                {/* Showing Admin Panel if User is an admin */}
                {student?.isAdmin && (
                  <NavLink to="admin" className="btn btn-primary text-white">
                    Admin Panel
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/editProfile"
                  className="btn btn-primary text-white">
                  Edit Profile
                </NavLink>
              </li>

              <li>
                <button
                  className="btn btn-secondary text-white "
                  onClick={signOutHandler}>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/signIn"
            className="btn btn-secondary text-white shadow-lg shadow-secondary/50 border-none">
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
