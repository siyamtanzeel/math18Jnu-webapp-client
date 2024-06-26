import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Members from "../Pages/Members/Members";
import Gallery from "../Pages/Gallery/Gallery";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import StudentPage from "../Pages/StudentPage/StudentPage";
import AdminPanel from "../Pages/Admin/AdminPanel";
import PrivateRoute from "./PrivateRoute";
import Resources from "../Pages/Resources/Resources.jsx";
import EditProfile from "../Pages/EditProfile/EditProfile";
import ByBlood from "../Pages/Members/ByBlood/ByBlood";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoutes from "./AdminRoutes";
import Users from "../Pages/Admin/Users/Users";

import ResourcesAdmin from "../Pages/Admin/ResourcesAdmin/ResourcesAdmin";
import Committee from "../Pages/Committee/Committee";
import Videos from "../Pages/Resources/Videos.jsx";
import Links from "../Pages/Resources/Links.jsx";
import VideoEditPage from "../Pages/Admin/ResourcesAdmin/VideoEditPage.jsx";
import AdminTitle from "../Components/AdminTitle.jsx";
import LinksEditPage from "../Pages/Admin/ResourcesAdmin/LinksEditPage.jsx";
import AddLinkPage from "../Pages/Admin/ResourcesAdmin/AddLinkPage.jsx";
import AddVideoPage from "../Pages/Admin/ResourcesAdmin/AddVideoPage.jsx";
import AddDocPage from "../Pages/Admin/ResourcesAdmin/AddDoc.jsx";
import DocEditPage from "../Pages/Admin/ResourcesAdmin/DocEditPage.jsx";
import AddUserPage from "../Pages/Admin/Users/AddUserPage.jsx";

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
        children: [
          {
            path: "/resources/videos",
            element: <Videos></Videos>,
          },
          {
            path: "/resources/links",
            element: <Links></Links>,
          },
        ],
      },
      {
        path: "/members",
        element: <Members></Members>,
      },
      {
        path: "/committee",
        element: <Committee></Committee>,
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
          fetch(
            `https://math18jnu-webapp-server.vercel.app/student/${params.id}`
          ),
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
      <AdminRoutes>
        <AdminPanel></AdminPanel>
      </AdminRoutes>
    ),
    children: [
      {
        path: "/admin",
        element: (
          <AdminRoutes>
            <div className="h-screen flex flex-col space-y-5 items-center justify-center text-center">
              <AdminTitle>Welcome to Admin Panel!</AdminTitle>
              <p>Open any section from the menu to start Administration</p>
            </div>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <AdminRoutes>
            <Users></Users>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/addUser/:id",
        element: <AddUserPage></AddUserPage>,
      },
      {
        path: "/admin/resources",
        element: (
          <AdminRoutes>
            <ResourcesAdmin></ResourcesAdmin>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/video/:id",
        element: (
          <AdminRoutes>
            <VideoEditPage></VideoEditPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/addVideo",
        element: (
          <AdminRoutes>
            <AddVideoPage></AddVideoPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/link/:id",
        element: (
          <AdminRoutes>
            <LinksEditPage></LinksEditPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/addLink",
        element: (
          <AdminRoutes>
            <AddLinkPage></AddLinkPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/link/:id",
        element: (
          <AdminRoutes>
            <LinksEditPage></LinksEditPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/addDoc",
        element: (
          <AdminRoutes>
            <AddDocPage></AddDocPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/doc/:id",
        element: (
          <AdminRoutes>
            <DocEditPage></DocEditPage>
          </AdminRoutes>
        ),
      },
    ],
  },
]);
