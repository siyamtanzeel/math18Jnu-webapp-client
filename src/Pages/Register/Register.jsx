import { useContext, useState } from "react";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { DarkModeContext } from "../../Providers/DarkModeProvider";
import { Link } from "react-router-dom";

export default function Register() {
  const { passwordAuthentication, setUser, user, authLoading, setAuthLoading } =
    useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [isPassShown, setIsPassShown] = useState(false);
  const LoginHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    passwordAuthentication(email, password)
      .then((res) => {
        setUser(res.user);
        setAuthLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setAuthLoading(false);
      });
  };
  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row items-center justify-center md:pt-20 md:justify-between max-w-2xl mx-auto h-full">
      {/*<!-- Component: Card with form --> */}
      {authLoading && (
        <div className="absolute top-0 left-0 w-full h-screen z-10 bg-slate-900/20 backdrop-blur-md flex items-center justify-center">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      <div className="">
        {darkMode && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src="/public/img/loginbg-dark.gif"
            className="w-60 md:w-80"
            alt=""
          />
        )}
        {darkMode || (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="/public/img/loginbg-light.gif"
            className="w-60 md:w-80"
            alt=""
          />
        )}
      </div>
      <form
        onSubmit={LoginHandler}
        className="max-w-sm overflow-hidden rounded-lg bg-white dark:bg-black text-slate-500 shadow-md shadow-slate-200 dark:shadow-slate-800">
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="font-medium text-sky-500 text-3xl">Register</h3>
          </header>
          <div className="flex flex-col space-y-3">
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="id-b03"
                type="email"
                name="email"
                placeholder="your name"
                className="peer relative h-10 w-full rounded border border-slate-200 p-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-sky-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-xs peer-focus:text-sky-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                Your email
              </label>
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="id-b13"
                type={isPassShown ? "text" : "password"}
                name="password"
                placeholder="your password"
                className="peer relative h-10 w-full rounded border border-slate-200 p-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all  invalid:border-pink-500 invalid:text-pink-500 focus:border-sky-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="password"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5  peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-xs peer-focus:text-sky-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                Your password
              </label>
              {isPassShown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}>
                  <FaRegEye
                    className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                    onClick={() => setIsPassShown(!isPassShown)}></FaRegEye>
                </motion.div>
              )}
              {isPassShown || (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}>
                  <FaRegEyeSlash
                    className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                    onClick={() =>
                      setIsPassShown(!isPassShown)
                    }></FaRegEyeSlash>
                </motion.div>
              )}
            </div>
            {/* Google sign in  */}
            <div className="flex items-center justify-center hover:text-sky-500 transition-colors duration-300 mt-4">
              <p className="text-center font-semibold mr-2">Sign in With </p>
              <span className="bg-slate-300 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center">
                <FcGoogle className="text-xl"></FcGoogle>
              </span>
            </div>

            <Link
              to="/login"
              className="flex items-center justify-center hover:text-sky-500 transition-colors duration-300 mt-2">
              <p className="text-center font-semibold mr-2">Already a User?</p>
              <span className="bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-2 h-8 rounded-full flex items-center justify-center">
                Log in
              </span>
            </Link>
          </div>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 ">
          <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-sky-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
            <span>Sign in</span>
          </button>
        </div>
      </form>
      {/*<!-- End Card with form --> */}
    </div>
  );
}
