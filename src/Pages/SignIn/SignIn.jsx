import { useContext } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { user, authLoading } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user?.email) {
    return <Navigate to="/"></Navigate>;
  }
  const signInHandler = (e) => {
    e.preventDefault();
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
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student ID</span>
              </label>
              <input
                type="text"
                placeholder="student ID"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
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
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
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
                className="btn btn-primary text-white mb-3 shadow-lg shadow-primary/50"
                type="submit">
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
