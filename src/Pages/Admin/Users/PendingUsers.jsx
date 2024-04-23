import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IoPersonAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import { IoDocumentTextOutline } from "react-icons/io5";

import AdminTitle from "../../../Components/AdminTitle";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PendingUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: async (res) => {
      const result = await axiosSecure.get("/admin/pendingUsers");
      return result.data;
    },
  });
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: " #e11d48",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        alert("approved");
        // axiosSecure
        //   .delete(`/admin/student/${id}`)
        //   .then((res) => {
        //     allRefetch();
        //     if (res.data.deletedCount > 0) {
        //       Swal.fire({
        //         title: "Deleted!",
        //         text: `${name}'s account has been deleted.`,
        //         icon: "success",
        //       });
        //     } else {
        //       Swal.fire({
        //         title: "Failed!",
        //         text: `Couldn't delete ${name}'s account!`,
        //         icon: "error",
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //     Swal.fire({
        //       title: "Failed!",
        //       text: `Couldn't delete ${name}'s account!`,
        //       icon: "error",
        //     });
        //   });
      }
    });
  };
  return (
    <div className="text-center py-5 px-3 flex flex-col items-center justify-center space-y-5 ">
      <AdminTitle>Pending Users</AdminTitle>
      {isLoading && (
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-primary/30 backdrop-blur-lg flex items-center justify-center">
          <progress className="progress w-56"></progress>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th className="hidden md:block">Info</th>
              <th>Responses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => {
              const { _id, name, email, std_id } = user;
              return (
                <tr key={std_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src="/img/userIcon.png" alt="User" />
                        </div>
                      </div>
                      <div className="font-bold">{name}</div>
                    </div>
                  </td>
                  <td className="hidden md:block">
                    {std_id}
                    <br />
                    <span className="badge badge-primary text-white badge-sm">
                      {email}
                    </span>
                  </td>
                  <td className="">
                    <Link
                      to={`/admin/addUser/${_id}`}
                      className="btn btn-sm btn-neutral text-white text-xl shadow-lg shadow-neutral/50 my-auto">
                      <IoDocumentTextOutline></IoDocumentTextOutline>
                    </Link>
                  </td>
                  <th className="space-x-1 flex items-end justify-end">
                    <button className="btn btn-sm btn-success text-white text-xl shadow-lg shadow-success/50">
                      <IoPersonAdd />
                    </button>
                    <button className="btn btn-sm btn-secondary text-white text-xl shadow-lg shadow-secondary/50">
                      <IoClose />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingUsers;
