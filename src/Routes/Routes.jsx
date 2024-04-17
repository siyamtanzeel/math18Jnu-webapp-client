import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Resources from "../Pages/Resources/Resources";
import Members from "../Pages/Members/Members";
import Gallery from "../Pages/Gallery/Gallery";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import StudentPage from "../Pages/StudentPage/StudentPage";
import AdminPanel from "../Pages/Admin/AdminPanel";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "../Pages/EditProfile/EditProfile";
import ByBlood from "../Pages/Members/ByBlood/ByBlood";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/resources",
        element: <Resources></Resources>,
      },
      {
        path: "/members",
        element: <Members></Members>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/member/:id",
        element: <StudentPage></StudentPage>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/student/${params.id}`),
      },
      {
        path: "/editProfile",
        element: <EditProfile></EditProfile>,
      },
      {
        path: "/findByBlood",
        element: <ByBlood></ByBlood>,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ),
  },
]);
