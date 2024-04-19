import React from "react";
import AdminTitle from "../../../Components/AdminTitle";
import { FaEdit, FaEye } from "react-icons/fa";
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-success">
              <th>Title</th>
              <th>View</th>
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

                  <td>
                    <Link
                      to={`/admin/video/${_id}`}
                      className="btn btn-neutral text-xl">
                      <FaEdit></FaEdit>
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
