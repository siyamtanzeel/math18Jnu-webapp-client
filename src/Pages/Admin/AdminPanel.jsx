import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { DarkModeContext } from "../../Providers/DarkModeProvider";
import NavList from "./Navbar/NavList";

const AdminPanel = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className="transition-colors duration-300 font-raleway min-h-screen">
      <Navbar></Navbar>
      <div className="grid grid-cols-12 justify-center items-center">
        <div className=" col-span-4 hidden lg:flex h-screen">
          <NavList></NavList>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
