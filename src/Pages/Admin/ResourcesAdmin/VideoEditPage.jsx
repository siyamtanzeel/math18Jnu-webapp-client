import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminTitle from "../../../Components/AdminTitle";
import Swal from "sweetalert2";
import { FaChevronLeft } from "react-icons/fa";

const VideoEditPage = () => {
  const id = useParams().id;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, refetch } = useQuery({
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
    Swal.fire({
      title: "Are you sure?",
      text: "This will update the video",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure
          .put(`/admin/updateVideo/${id}`, updatedVideo)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setLoading(false);
              Swal.fire({
                title: "Successful!",
                text: "Your video has been Updated!",
                icon: "success",
              });
              refetch();

              navigate("/admin/resources");
            } else {
              setLoading(false);
              Swal.fire({
                title: "Failed!",
                text: "Couldn't Update the video",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            Swal.fire({
              title: "Failed!",
              text: "Couldn't Update the video",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center py-5 space-y-5">
      {(isLoading || loading) && (
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-primary/30 backdrop-blur-lg flex flex-col items-center justify-center space-y-3">
          <progress className="progress w-56"></progress>
          <p className="text-base-content font-bold text-2xl">Processing</p>
        </div>
      )}
      <AdminTitle>Edit Video</AdminTitle>
      <p className="font-bold text-xl text-center">{data?.title}</p>
      <div className="w-full flex items-center justify-between px-3">
        <Link
          className="rounded-full p-2 border border-base-content/60"
          to="/admin/resources">
          <FaChevronLeft></FaChevronLeft>
        </Link>
      </div>
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
              <span className="text-lg label-text text-success">
                Video Privacy
              </span>
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
              <span
                className="text-lg label-text text-success"
                style={{ fontFamily: "sans-serif" }}>
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
