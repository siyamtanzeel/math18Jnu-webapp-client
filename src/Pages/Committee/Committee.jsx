import React from "react";
import Title from "../../Components/Title";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const Committee = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["committeeData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/committee");
      return res.data;
    },
  });
  return (
    <div className="h-full py-5 flex flex-col items-center justify-center space-y-10">
      <Helmet>
        <title>Committee - Eccentric-18</title>
      </Helmet>
      <Title>Eccentric-18 Committee</Title>
      {/* CR section */}
      {isLoading ? (
        <div className="w-full min-h-[500px] flex items-center justify-center">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-center justify-center py-10">
          {data?.map((member) => (
            <div className="card w-72 bg-base-100 shadow-xl" key={member._id}>
              <figure className="px-10 pt-10">
                <img
                  src={member.photoURL}
                  alt={member.name}
                  className="rounded-full w-56 h-56 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary font-semibold text-xl">
                  {member.name}
                </h2>
                <p>{member.role}</p>
                <div className="card-actions space-x-1">
                  <Link
                    className="btn btn-secondary text-white"
                    to={`/member/${member.std_id}`}>
                    Profile
                  </Link>
                  <a
                    className="btn btn-primary text-white"
                    href={member.facebook}
                    target="blank">
                    Connect
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Committee;
