import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../Firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FcCancel } from "react-icons/fc";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
export const GoogleProvider = new GoogleAuthProvider();

const GoogleSignIn = () => {
  const { user, setUser, student, authLoading, setStudent, setAuthLoading } =
    useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const googleSignInHandler = () => {
    setAuthLoading(true);
    signInWithPopup(auth, GoogleProvider)
      .then((res) => {
        axiosSecure
          .post(`/userAuth`, { email: res.user.email })
          .then((result) => {
            if (result.data.email) {
              axiosSecure
                .post("/jwt", result.data)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err.message));
              Swal.fire({
                title: "Log In Successful",
                text: `Welcome ${result.data.name}!`,
                icon: "success",
              });
              setUser(res.user);
              setStudent(result.data);
              setAuthLoading(false);
            } else {
              setUser(null);
              signOut(auth).then((res) => {
                setAuthLoading(false);
                Swal.fire({
                  title: "Sorry, Couldn't Log In!",
                  text: "You are not a member of Eccentric-18",
                  icon: "error",
                });
                navigate("/");
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Sorry, Couldn't Log In!",
              text: "An Error Occured",
              icon: "error",
            });
            navigate("/");
            setAuthLoading(false);
            console.log(err.message);
          });
      })
      .catch((err) => {
        Swal.fire({
          title: "Sorry, Couldn't Log In!",
          text: "An Error Occured",
          icon: "error",
        });
        console.log(err.message);
        setAuthLoading(false);
      });
  };
  return (
    <button
      onClick={googleSignInHandler}
      className="btn btn-primary text-white flex items-center shadow-lg shadow-primary/50 border-none">
      <FcGoogle className="mr-1 text-xl"></FcGoogle>Sign in With Google
    </button>
  );
};

export default GoogleSignIn;
