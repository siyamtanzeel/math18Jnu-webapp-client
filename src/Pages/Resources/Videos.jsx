import ReactPlayer from "react-player";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Videos = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["educationalVideos"],
    queryFn: async () => {
      const res = await axiosSecure.get("/educationalVideos");
      return res.data;
    },
  });
  return (
    <div
      className="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8"
      data-aos="zoom-out">
      {isLoading && "loading"}
      {data?.map((video) => {
        const { _id, title, videoURLs, privacy, term } = video;
        return (
          <div className=" space-y-2" key={_id}>
            <ReactPlayer
              className="max-w-72 max-h-52 md:max-w-80 md:max-h-60"
              controls
              url={videoURLs}></ReactPlayer>
            <p className="text-center max-w-72 md:max-w-80 font-bold ">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Videos;
