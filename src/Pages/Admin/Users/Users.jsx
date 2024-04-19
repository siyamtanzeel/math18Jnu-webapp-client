import React, { useState } from "react";
import AdminTitle from "../../../Components/AdminTitle";
import useStudents from "../../../hooks/useStudents";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AllUsers from "./AllUsers";
import PendingUsers from "./PendingUsers";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const [tabIdx, setTabIdx] = useState(1);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Helmet>
        <title>{tabIdx == 1 ? "All Users" : "Pending Users"} - Admin</title>
      </Helmet>
      <div role="tablist" className="tabs tabs-boxed max-w-60 mx-auto mt-12">
        <a
          role="tab"
          className={`tab ${
            tabIdx == 1 &&
            "bg-success text-white transition-colors duration-300"
          }`}
          onClick={() => setTabIdx(1)}>
          All
        </a>
        <a
          role="tab"
          className={`tab ${
            tabIdx == 2 &&
            "bg-success text-white transition-colors duration-300"
          }`}
          onClick={() => setTabIdx(2)}>
          Pending
        </a>
      </div>
      {tabIdx == 1 && <AllUsers></AllUsers>}
      {tabIdx == 2 && <PendingUsers></PendingUsers>}
    </div>
  );
};

export default Users;
