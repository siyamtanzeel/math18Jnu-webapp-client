import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Links = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const result = await axiosSecure.get("/resources");
      return result.data;
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5">
      {isLoading
        ? "loading"
        : data.map((link) => (
            <a
              key={link._id}
              className="btn btn-primary text-white w-full text-lg font-normal shadow-lg shadow-primary/50"
              href={link.link}>
              {link.title}
            </a>
          ))}
    </div>
  );
};

export default Links;
