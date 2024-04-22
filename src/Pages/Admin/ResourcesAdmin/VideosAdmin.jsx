import React, { useState } from "react";
import AdminTitle from "../../../Components/AdminTitle";
import { FaChevronLeft, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const VideosAdmin = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await axiosSecure.get("/educationalVideos");
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will Delete the video from resources",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure
          .delete(`/admin/deleteVideo/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setLoading(false);
              Swal.fire({
                title: "Successful!",
                text: "Your video has been Added!",
                icon: "success",
              });
              refetch();
            } else {
              setLoading(false);
              Swal.fire({
                title: "Failed!",
                text: "Couldn't delete the video",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            Swal.fire({
              title: "Failed!",
              text: "Couldn't delete the video",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="">
      <div className="w-full flex items-center justify-between px-3 py-7">
        {(isLoading || loading) && (
          <div className="absolute top-0 left-0 z-30 w-full h-full bg-primary/30 backdrop-blur-lg flex flex-col items-center justify-center space-y-3">
            <progress className="progress w-56"></progress>
            <p className="text-base-content font-bold text-2xl">Processing</p>
          </div>
        )}
        <Link
          className="rounded-full p-2 border border-base-content/60"
          to="/admin">
          <FaChevronLeft></FaChevronLeft>
        </Link>
        <Link
          to={"/admin/addVideo"}
          className="btn btn-neutral btn-outline btn-sm">
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
            {/* row 1 */}
            {data?.map((item) => {
              const { _id, title } = item;
              return (
                <tr key={_id} className="rounded-md bg-base-100">
                  <td className="font-bold">{title}</td>

                  <td className="flex space-x-1">
                    <Link
                      to={`/admin/video/${_id}`}
                      className="btn btn-sm btn-neutral text-xl shadow-lg shadow-neutral/50">
                      <FaEdit></FaEdit>
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)}
                      to={`/`}
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

export default VideosAdmin;
