import { useContext, useEffect, useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactPasswordChecklist from "react-password-checklist";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const Login = () => {
  const [passwordVal, setPasswordVal] = useState("");
  const [isDisabled, setisDisabled] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    student,
    setStudent,
    setUser,
    authLoading,
    setAuthLoading,
    SignIn,
  } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  if (authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (student?.email) {
    return <Navigate to="/"></Navigate>;
  }
  const signInHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    setAuthLoading(true);
    SignIn(email, password)
      .then((res) => {
        if (res?.user?.email) {
          axiosSecure.post("/userAuth", { email: email }).then((result) => {
            if (!result.data) {
              Swal.fire({
                title: "Failed to Log In!",
                text: "Sorry You Are not a member of Eccentric-18",
                icon: "error",
              });
              setAuthLoading(false);
              signOut(auth).then();
            } else {
              setUser(res.user);
              setStudent(result.data);
              setAuthLoading(false);
              Swal.fire({
                title: "Succesfully Logged in",
                text: `Welcome ${result.data.name}!`,
                icon: "success",
              });
              navigate("/");
            }
          });
        }
      })
      .catch((err) => {
        setAuthLoading(false);
        Swal.fire({
          title: "Failed to Log In!",
          text: "Invalid Email or Password",
          icon: "error",
        });
        console.log(err.message);
      });
  };
  return (
    <div className="hero h-screen bg-base-100">
      <div className="hero-content flex-col md:flex-row items-center justify-center space-y-4">
        <div className="text-center lg:text-left">
          <img
            src="/public/img/login.png"
            alt=""
            className="w-[360px] md:w-[500px]"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={signInHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="password"
                onChange={(e) => {
                  setPasswordVal(e.target.value);
                }}
                className="input input-bordered"
                required
              />
              <div className="py-5">
                <ReactPasswordChecklist
                  className=""
                  rules={["minLength"]}
                  minLength={8}
                  value={passwordVal}
                  messages={{
                    minLength: "Password Must contain At least 8 Characters",
                  }}
                  onChange={(isvalid) =>
                    isvalid ? setisDisabled(false) : setisDisabled(true)
                  }
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Show Password</span>
                  <input
                    type="checkbox"
                    onChange={() => setShowPass(!showPass)}
                    className="checkbox checkbox-primary "
                  />
                </label>
              </div>
              <label className="label">
                <p href="#" className="label-text-alt ">
                  Not Registered?{" "}
                  <Link className="text-primary" to="/signup">
                    Create an account
                  </Link>
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary text-white mb-3 "
                type="submit"
                disabled={isDisabled}>
                Login
              </button>
              <GoogleSignIn></GoogleSignIn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
