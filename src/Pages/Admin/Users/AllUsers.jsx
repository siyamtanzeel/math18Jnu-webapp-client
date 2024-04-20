import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import AdminTitle from "../../../Components/AdminTitle";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Providers/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { student } = useContext(AuthContext);
  const {
    data: allStudents,
    isLoading: allLoading,
    refetch: allRefetch,
  } = useQuery({
    queryKey: ["allStudentsAdmin"],
    queryFn: async (res) => {
      const result = await axiosSecure.get(
        `/admin/allStudents?email=${student.email}`
      );
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
    <div className="text-center py-5 px-3 flex flex-col items-center justify-center space-y-5 ">
      {allLoading && (
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-primary/30 backdrop-blur-lg flex flex-col items-center justify-center space-y-3">
          <progress className="progress w-56"></progress>
          <p className="text-base-content font-bold text-2xl">Processing</p>
        </div>
      )}
      <AdminTitle>All Users</AdminTitle>

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
            {!allStudents?.length ? (
              <div className="text-xl text-center font-bold mx-auto h-[360px] w-full flex items-center justify-center">
                <p>Couldn't retrieve data</p>
              </div>
            ) : (
              allStudents?.map((student) => {
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
                        className={`btn btn-secondary btn-xs md:btn-md text-white md:text-xl ${
                          isAdmin || " shadow-lg shadow-secondary/50"
                        }`}
                        onClick={() => handleDelete(_id)}
                        disabled={isAdmin}>
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                );
              })
            )}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
