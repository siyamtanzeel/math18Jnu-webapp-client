import React, { useContext } from "react";
import { DarkModeContext } from "../../../Providers/DarkModeProvider";
import { motion } from "framer-motion";

const Banner = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className="absolute top-0 left-0 w-full h-full px-5 bg-base-100/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-5 text-center">
      <motion.h1
        initial={{
          y: 75,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
        className={`${
          darkMode ? "text-white" : "text-black"
        } capitalize text-3xl lg:text-7xl font-semibold `}>
        We are{" "}
        <span className="inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-sky-500 to-emerald-500 drop-shadow-md">
          Eccentric-18
        </span>
      </motion.h1>
      <motion.p
        initial={{
          y: 75,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
        className={`${
          darkMode ? "text-amber-400" : "text-black"
        }  text-base lg:text-xl`}>
        18th Batch of the Department of Mathematics, Jagannath University
      </motion.p>
      <motion.a
        initial={{
          y: 75,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
        href="https://www.facebook.com/profile.php?id=61556073064932"
        className="btn btn-outline btn-secondary  lg:btn-lg ">
        Connect
      </motion.a>
    </div>
  );
};

export default Banner;
