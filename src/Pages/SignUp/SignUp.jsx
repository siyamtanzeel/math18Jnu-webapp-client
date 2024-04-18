import { useContext, useState } from "react";

import { AuthContext } from "../../Providers/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Title from "../../Components/Title";
import GoogleSignIn from "../SignIn/GoogleSignIn";
import ReactPasswordChecklist from "react-password-checklist";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SignUp = () => {
  const { user, student, authLoading } = useContext(AuthContext);
  const [passwordVal, setPasswordVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
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
  const signUpHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const student_id = form.studentID.value.trim();
    const ques1 = form.ques1.value.trim();
    const ques2 = form.ques2.value.trim();
    const ques3 = form.ques3.value.trim();
    const ques4 = form.ques4.value.trim();
    const ques5 = form.ques5.value.trim();
    const ques6 = form.ques6.value.trim();
    const newUser = {
      name: name,
      email: email,
      password: password,
      student_id: student_id,
      ques1: ques1,
      ques2: ques2,
      ques3: ques3,
      ques4: ques4,
      ques5: ques5,
      ques6: ques6,
    };
    setLoading(true);
    axiosSecure
      .post("/pendingUser", newUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          setLoading(false);
          Swal.fire({
            title: "Successfully Registered!",
            text: `Dear ${newUser.name}, your request will be reviwed by our admins for verification. Please wait until you recieve a confirmation email. `,
            icon: "success",
          });
          navigate("/");
          form.reset();
        } else {
          setLoading(false);
          Swal.fire({
            title: "Failed to Register!",
            text: `Dear ${newUser.name},Your request could not proceed at this moment! Please try again later`,
            icon: "error",
          });
          form.reset();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        Swal.fire({
          title: "Failed to Register!",
          text: `Dear ${newUser.name},Your request could not proceed at this moment! Please try again later`,
          icon: "error",
        });
      });
  };
  return (
    <div className="hero h-auto bg-base-300/50 flex flex-col  items-center justify-center py-20 px-3">
      {loading && (
        <div className="absolute top-0 left-0 bg-base-100/50 backdrop-blur-lg h-full w-full z-40 flex flex-col items-center py-52 justify-start">
          <progress className="progress w-56"></progress>
          <p className="mt-3">Processing Request</p>
        </div>
      )}
      <Title>Create an Account</Title>

      <div className="hero-content flex-col items-center justify-center space-y-4">
        <div className="mt-10">
          <h2 className="font-bold text-warning text-2xl text-center">
            Instructions
          </h2>
          <p className="max-w-2xl text-base-content/60 mt-3 md:mt-6 text-justify font-semibold font-bengali">
            নতুন একাউন্ট খোলার জন্য আপনাকে আমাদের নিম্নলিখিত কিছু প্রশ্নের উত্তর
            দিতে হবে। প্রশ্নগুলোতে আপনার প্রদত্ত উত্তরের সাপেক্ষে admin কর্তৃক
            আপনার তথ্য ভেরিফাই করে ইন শা আল্লাহ সর্বোচ্চ ৪৮ ঘণ্টার মধ্যে আপনাকে
            একটি confirmation email পাঠানো হবে। এরপর আপনি app এ login করে যাবতীয়
            user facitilies ব্যবহার করতে পারবেন।
          </p>
        </div>
        <div className="card flex-1 w-full shadow-2xl bg-base-100">
          <form className="card-body w-full" onSubmit={signUpHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-lg label-text text-primary">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
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
                  name="studentID"
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
                  name="ques1"
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
                  name="ques2"
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
                  name="ques3"
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
                  name="ques4"
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
                  name="ques5"
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
                  name="ques6"
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
                  name="email"
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
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  onChange={(e) => setPasswordVal(e.target.value)}
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="pt-3">
              <ReactPasswordChecklist
                rules={["minLength"]}
                minLength={8}
                value={passwordVal}
                messages={{
                  minLength: "Password Must contain at least 8 Characters",
                }}
                onChange={(isValid) => {
                  isValid ? setIsDisabled(false) : setIsDisabled(true);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-lg">Show Password</span>
                <input
                  type="checkbox"
                  onChange={() => setShowPass(!showPass)}
                  className="checkbox checkbox-primary "
                />
              </label>
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
                className="btn btn-primary text-white mb-3 "
                disabled={isDisabled}
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
