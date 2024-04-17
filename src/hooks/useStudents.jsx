import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const useStudents = () => {
  const axiosSecure = useAxiosSecure();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["studentsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/students");
      return res.data;
    },
  });
  return { data, error, isLoading, refetch };
};

export default useStudents;
