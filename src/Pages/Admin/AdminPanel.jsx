import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { DarkModeContext } from "../../Providers/DarkModeProvider";
import NavList from "./Navbar/NavList";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className="relative transition-colors duration-300 font-raleway min-h-screen grid grid-cols-12 justify-center items-center">
      <Navbar></Navbar>
      <div className="col-span-3 hidden lg:flex h-screen">
        <div className="fixed top-0 left-0 z-10 w-[calc(20%)] hidden lg:flex items-center justify-center h-screen">
          <NavList></NavList>
        </div>
      </div>
      <div className="col-span-12 px-3 lg:px-0 lg:col-span-8 pt-16">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default AdminPanel;
