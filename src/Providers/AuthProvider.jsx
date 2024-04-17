import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     axiosSecure
  //       .get(`/userAuth/${user.email}`)
  //       .then((result) => {
  //         setUser(user);
  //         setStudent(result.data);
  //         setAuthLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //         setAuthLoading(false);
  //       });
  //   });
  //   return unsubscribe;
  // }, [axiosSecure]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch(`http://localhost:5000/userAuth/${user.email}`)
          .then((res) => res.json())
          .then((result) => {
            console.log(user, result);
            setUser(user);
            setStudent(result);
            setAuthLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
            setAuthLoading(false);
          });
      } else {
        setAuthLoading(false);
        setUser(null);
        setStudent(null);
      }
    });
  }, []);
  const passwordAuthentication = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const exports = {
    user,
    setUser,
    student,
    setStudent,
    passwordAuthentication,
    authLoading,
    setAuthLoading,
  };
  return (
    <AuthContext.Provider value={exports}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
