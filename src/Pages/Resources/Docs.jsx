import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

const Docs = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["docs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/docs");
      return res.data;
    },
  });
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold">
              <th>Title</th>
              <th>Type</th>
              <th>Term</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody className="rounded-md bg-base-100 space-y-1">
            {/* row 1 */}
            {isLoading && "Loading"}
            {data?.map((item) => {
              const { _id, title, link, media, term } = item;
              return (
                <tr key={_id} className="rounded-md bg-base-100">
                  <td className="font-bold text-primary">{title}</td>
                  <td>{media}</td>
                  <td>{term}</td>
                  <td>
                    <a
                      href={link}
                      target="blank"
                      className="btn btn-neutral text-xl">
                      <FaEye></FaEye>
                    </a>
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

export default Docs;
