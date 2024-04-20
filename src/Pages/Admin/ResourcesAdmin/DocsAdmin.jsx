import React, { useState } from "react";
import { FaChevronLeft, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const DocsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["docs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/docs");
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the doc from resources",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure
          .delete(`/admin/deleteDoc/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setLoading(false);
              Swal.fire({
                title: "Successful!",
                text: "Your doc has been Added!",
                icon: "success",
              });
              refetch();
            } else {
              setLoading(false);
              Swal.fire({
                title: "Failed!",
                text: "Couldn't delete the doc",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            Swal.fire({
              title: "Failed!",
              text: "Couldn't delete the docs",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {(isLoading || loading) && (
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-primary/30 backdrop-blur-lg flex flex-col items-center justify-center space-y-3">
          <progress className="progress w-56"></progress>
          <p className="text-base-content font-bold text-2xl">Processing</p>
        </div>
      )}
      <div className="w-full flex items-center justify-between px-3 py-7">
        <Link
          className="rounded-full p-2 border border-base-content/60"
          to="/admin">
          <FaChevronLeft></FaChevronLeft>
        </Link>
        <Link
          className="btn btn-neutral btn-outline btn-sm"
          to={"/admin/addDoc"}>
          Add
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-success">
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="rounded-md bg-base-100 space-y-1">
            {data
              ?.sort((a, b) => {
                // Parse the issuedAt date strings to Date objects
                const dateA = new Date(a?.iat);
                const dateB = new Date(b?.iat);

                // Compare the dates
                if (dateA > dateB) {
                  return -1; // a is more recent, so keep it before b
                } else if (dateA < dateB) {
                  return 1; // b is more recent, so keep it before a
                } else {
                  return 0; // a and b have the same date
                }
              })
              .map((item) => {
                const { _id, title } = item;
                return (
                  <tr key={_id} className="rounded-md bg-base-100">
                    <td className="font-bold">{title}</td>

                    <td className="space-x-1 flex">
                      <Link
                        to={`/admin/doc/${_id}`}
                        className="btn btn-sm btn-neutral text-xl shadow-lg shadow-neutral/50">
                        <FaEdit></FaEdit>
                      </Link>
                      <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-sm btn-secondary text-xl shadow-lg shadow-secondary/50">
                        <FaTrash></FaTrash>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocsAdmin;
