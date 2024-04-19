import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminTitle from "../../../Components/AdminTitle";

const VideoEditPage = () => {
  const id = useParams().id;
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["videoData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/video/${id}`);
      return res.data;
    },
  });
  const updateHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const privacy = form.privacy.value;
    const term = form.term.value;
    const videoURLs = form.videoURLs.value.split(",");
    const updatedVideo = {
      title: title,
      privacy: privacy,
      term: term,
      videoURLs: videoURLs,
    };
    console.log(updatedVideo);
  };
  return (
    <div className="flex flex-col items-center justify-center py-5 space-y-5">
      <AdminTitle>Edit Video</AdminTitle>
      <p className="font-bold text-xl">{data?.title}</p>
      {isLoading && "loading"}
      <form className="card-body w-full" onSubmit={updateHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
          {/* Title */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="text-lg label-text text-success">
                Video Title
              </span>
            </label>
            <input
              type="text"
              defaultValue={data?.title}
              name="title"
              placeholder="Video Title"
              className="input input-bordered input-success"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">Term</span>
            </label>
            <select
              className="select select-success w-full max-w-xs"
              name="term"
              defaultValue={data?.term}>
              <option>1-2</option>
              <option>2-1</option>
              <option>2-2</option>
              <option>3-1</option>
              <option>3-2</option>
              <option>4-1</option>
              <option>4-2</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">Term</span>
            </label>
            <select
              defaultValue={data?.privacy}
              name="privacy"
              className="select select-success w-full max-w-xs">
              <option>public</option>
              <option>private</option>
            </select>
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="text-lg label-text text-success">
                VideoURLs{" "}
                <span className="text-base-content">
                  (seperate using commas. Don't use spaces)
                </span>
              </span>
            </label>

            <textarea
              placeholder="Video URLs"
              name="videoURLs"
              defaultValue={data?.videoURLs.join(",")}
              className="textarea textarea-success min-h-24"
              required></textarea>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-success text-white mb-3 " type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoEditPage;
