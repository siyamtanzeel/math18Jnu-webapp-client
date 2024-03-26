import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { DarkModeContext } from "../Providers/DarkModeProvider";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import UserDropdown from "../Components/UserDropdown";
import UserModal from "../Components/UserModal";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [pathname, setPathname] = useState(window.location.pathname);
  const NavbarItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Resources",
      link: "/resources",
    },
    {
      name: "Members",
      link: "/members",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
  ];
  return (
    <div>
      {/*<!-- Component: Navbar with Topbar --> */}
      {/*<!-- Top bar --> */}

      {/*<!-- Header --> */}
      <header className="border-b-1 fixed top-0 left-0 z-20 w-full border-b border-slate-200 dark:border-slate-700  bg-white/50 dark:bg-slate-900/80 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 backdrop-blur-md lg:after:hidden transition-colors duration-300">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[4.5rem] items-stretch justify-between font-medium text-slate-700 dark:text-white/70"
            role="navigation">
            {/*      <!-- Brand logo --> */}
            <div className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1">
              <img
                src={
                  darkMode
                    ? "/public/img/eccentric18logo-white.png"
                    : "/public/img/eccentric18logo-black.png"
                }
                alt=""
                className="w-16"
              />
            </div>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation">
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 dark:bg-white/70 transition-all duration-300"></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 dark:bg-white/70 transition duration-300"></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 dark:bg-white/70 transition-all duration-300"></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 dark:bg-slate-900/80 lg:dark:bg-transparent px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-md"
                  : "invisible opacity-0"
              }`}>
              {NavbarItems.map((item) => {
                return (
                  <li
                    role="none"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-zinc-600 dark:hover:text-white  lg:px-8"
                    key={item.name}>
                    <NavLink
                      onClick={() => {
                        setPathname(item.link);
                        if (isToggleOpen) {
                          setIsToggleOpen(false);
                        }
                      }}
                      className={pathname == item.link && "text-sky-600 "}
                      to={item.link}>
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            {/*      <!-- Actions --> */}
            <div className="ml-auto flex items-center space-x-3 justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
              {/* <UserDropdown></UserDropdown> */}
              <UserModal></UserModal>
              <span
                className="w-8 h-8 flex items-center justify-center bg-slate-900/10 dark:bg-white/10 rounded-full text-xl"
                onClick={() => {
                  setDarkMode(!darkMode);
                  document.querySelector("html").classList.toggle("dark");
                }}>
                {darkMode && (
                  <motion.div
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 0.8 }}>
                    <FaMoon></FaMoon>
                  </motion.div>
                )}
                {darkMode || (
                  <motion.div
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 0.7 }}>
                    <FaSun className="text-yellow-500"></FaSun>
                  </motion.div>
                )}
              </span>
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Topbar--> */}
    </div>
  );
}
