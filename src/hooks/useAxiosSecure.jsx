import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "https://math18jnu-webapp-server.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await signOut(auth);
        Swal.fire({
          title: "Session Expired",
          text: "Please log in again!",
          icon: "error",
        });
      }
    }
  );
  return axiosSecure;
};
export default useAxiosSecure;
