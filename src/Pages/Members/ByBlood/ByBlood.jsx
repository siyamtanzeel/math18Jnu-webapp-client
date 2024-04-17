import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/Title";
import { useEffect, useState } from "react";
import MemberCard from "../MemberCard";
import { Helmet } from "react-helmet-async";

const axiosSecure = useAxiosSecure();
const ByBlood = () => {
  const [blood_group, setBlood_group] = useState("O+");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["studentsByBlood"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/${blood_group}`);
      return res.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [blood_group, refetch]);
  return (
    <div>
      <div className="h-full px-2 flex flex-col items-center justify-start py-7 space-y-5 rounded-t-lg min-h-screen">
        <Helmet>
          <title>Members - Eccentric-18</title>
        </Helmet>
        <Title>Find by Blood Group</Title>
        <select
          onInput={(e) => {
            setBlood_group(e.target.value);
          }}
          className="select select-bordered w-full max-w-xs text-lg">
          {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
            <option key={bg} className="my-2 text-lg" value={bg}>
              {bg}
            </option>
          ))}
        </select>
        <p className="text-rose-500 font-semibold text-lg">
          {data?.length} people with {blood_group} blood
        </p>
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              className="flex flex-col gap-4 w-72 md:w-80 min-h-[500px]"
              key={idx}>
              <div className="skeleton h-52 w-full"></div>
              <div className="skeleton h-10 w-28"></div>
              <div className="skeleton h-10 w-full"></div>
              <div className="skeleton h-10 w-full"></div>
            </div>
          ))}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-center justify-center">
          {data?.map((student) => {
            return (
              <MemberCard key={student.std_id} student={student}></MemberCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ByBlood;
