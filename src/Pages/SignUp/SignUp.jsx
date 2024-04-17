import { useContext } from "react";

import { AuthContext } from "../../Providers/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import Title from "../../Components/Title";
import GoogleSignIn from "../SignIn/GoogleSignIn";

const SignUp = () => {
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
    <div className="hero h-auto bg-base-300/50 flex flex-col  items-center justify-center py-20 px-3">
      <Title>Create an Account</Title>

      <div className="hero-content flex-col items-center justify-center space-y-4">
        <div className="mt-10">
          <h2 className="font-bold text-warning text-2xl text-center">
            Instructions
          </h2>
          <p className="max-w-2xl text-gray-500 mt-3 md:mt-6 text-justify">
            নতুন একাউন্ট খোলার জন্য আপনাকে আমাদের নিম্নলিখিত কিছু প্রশ্নের উত্তর
            দিতে হবে। প্রশ্নগুলোতে আপনার প্রদত্ত উত্তরের সাপেক্ষে admin কর্তৃক
            আপনার তথ্য ভেরিফাই করে ইন শা আল্লাহ সর্বোচ্চ ৪৮ ঘণ্টার মধ্যে আপনাকে
            একটি confirmation email পাঠানো হবে। এরপর আপনি app এ login করে যাবতীয়
            user facitilies ব্যবহার করতে পারবেন।
          </p>
        </div>
        <div className="card flex-1 w-full shadow-2xl bg-base-100">
          <form className="card-body w-full" onSubmit={signInHandler}>
            <div className="grid grid-cols-2 items-center justify-center gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-lg label-text text-primary">Name</span>
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
                  <span className="text-lg label-text text-primary">
                    Student ID
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="student ID"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control font-bengali">
                <label className="label">
                  <span className="text-lg label-text text-primary">
                    কোন ভার্সিটির মার্কারের কালি সবচেয়ে ভালো?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার উত্তর"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control font-bengali">
                <label className="label">
                  <span className="text-lg label-text text-primary">
                    আমাদের প্রিয় অভিভাবক কে?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার উত্তর"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control font-bengali">
                <label className="label">
                  <span className="text-lg label-text text-primary">
                    {`" ছল্লা "`} শব্দের অর্থ কি?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার উত্তর"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control font-bengali">
                <label className="label">
                  <span className="text-lg label-text text-primary">
                    ব্যাচের {`" খালাতো ভাই "`} কে?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার উত্তর"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control font-bengali">
                <label className="label">
                  <span className="text-lg label-text text-primary">
                    69 শুনলেই আপনার মাথায় কার নাম আসে?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার উত্তর"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control font-bengali">
                <label className="label">
                  <span className="text-lg label-text text-primary">
                    রমণীদের সহিত কাহার খুনসুটি সবচাইতে বেশী?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার উত্তর"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-lg label-text text-primary">Email</span>
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
                  <span className="text-lg label-text text-primary">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <label className="label">
              <p href="#" className="text-lg label-text-alt link link-hover">
                Already a user?{" "}
                <Link className="text-primary" to="/signin">
                  Sign in
                </Link>
              </p>
            </label>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary text-white mb-3 shadow-lg shadow-primary/50"
                type="submit">
                Submit
              </button>
              <GoogleSignIn></GoogleSignIn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
