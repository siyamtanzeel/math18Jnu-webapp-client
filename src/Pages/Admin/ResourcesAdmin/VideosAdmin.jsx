import React from "react";
import AdminTitle from "../../../Components/AdminTitle";
import { FaChevronLeft, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const VideosAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await axiosSecure.get("/educationalVideos");
      return res.data;
    },
  });
  return (
    <div className="">
      <div className="w-full flex items-center justify-between px-3">
        <Link
          className="rounded-full p-2 border border-base-content/60"
          to="/admin">
          <FaChevronLeft></FaChevronLeft>
        </Link>
        <button className="btn btn-neutral btn-outline btn-sm">Add</button>
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
            {isLoading && "Loading"}
            {data?.map((item) => {
              const { _id, title } = item;
              return (
                <tr key={_id} className="rounded-md bg-base-100">
                  <td className="font-bold">{title}</td>

                  <td className="flex space-x-1">
                    <Link
                      to={`/admin/video/${_id}`}
                      className="btn btn-sm btn-neutral text-xl">
                      <FaEdit></FaEdit>
                    </Link>
                    <Link to={`/`} className="btn btn-sm btn-secondary text-xl">
                      <FaTrash></FaTrash>
                    </Link>
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
