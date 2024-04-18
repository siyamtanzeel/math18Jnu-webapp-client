import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import AdminTitle from "../../../Components/AdminTitle";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allStudents,
    isLoading: allLoading,
    refetch: allRefetch,
  } = useQuery({
    queryKey: ["allStudentsAdmin"],
    queryFn: async (res) => {
      const result = await axiosSecure.get("/admin/allStudents");
      return result.data;
    },
  });
  const handleDelete = (id) => {
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
        axiosSecure
          .delete(`/admin/student/${id}`)
          .then((res) => {
            allRefetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${name}'s account has been deleted.`,
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Failed!",
                text: `Couldn't delete ${name}'s account!`,
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              title: "Failed!",
              text: `Couldn't delete ${name}'s account!`,
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="text-center py-5 px-3 flex flex-col items-center justify-center space-y-5">
      <AdminTitle>All Users</AdminTitle>
      {allLoading && "Loading"}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-primary">
              <th>Name</th>
              <th>Role</th>
              <th className="hidden md:block">Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {allStudents?.map((student) => {
              const { name, phone, photoURL, isAdmin, _id } = student;
              return (
                <tr key={name}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={photoURL || "/public/img/userIcon.png"}
                            alt={name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {isAdmin ? (
                      <span className="text-secondary font-bold">Admin</span>
                    ) : (
                      "User"
                    )}
                  </td>
                  <td className="hidden md:flex">{phone}</td>
                  <th>
                    <button
                      className="btn btn-secondary btn-xs md:btn-md text-white md:text-xl shadow-lg shadow-secondary/50"
                      onClick={() => handleDelete(_id)}
                      disabled={isAdmin}>
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
