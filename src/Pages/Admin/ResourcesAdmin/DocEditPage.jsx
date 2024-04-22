import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminTitle from "../../../Components/AdminTitle";
import Swal from "sweetalert2";
import { FaChevronLeft } from "react-icons/fa";

const DocEditPage = () => {
  const id = useParams().id;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["docData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/doc/${id}`);
      return res.data;
    },
  });
  const updateHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const link = form.link.value;
    const privacy = form.privacy.value;
    const media = form.media.value;
    const category = form.category.value;
    const term = form.term.value;
    const iat = new Date();

    const updatedDoc = {
      title: title,
      link: link,
      media: media,
      category: category,
      privacy: privacy,
      term: term,
      iat: iat,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "This will update the doc",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure
          .put(`/admin/updateDoc/${id}`, updatedDoc)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setLoading(false);
              Swal.fire({
                title: "Successful!",
                text: "Your doc has been Updated!",
                icon: "success",
              });
              refetch();

              navigate("/admin/resources");
            } else {
              setLoading(false);
              Swal.fire({
                title: "Failed!",
                text: "Couldn't Update the doc",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            Swal.fire({
              title: "Failed!",
              text: "Couldn't Update the doc",
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
      <AdminTitle>Edit Doc</AdminTitle>
      <p className="font-bold text-xl">{data?.title}</p>
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
              <span className="text-lg label-text text-success">Doc Title</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={data?.title}
              placeholder="Doc Title"
              className="input input-bordered input-success"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">Doc URL</span>
            </label>
            <input
              type="text"
              name="link"
              defaultValue={data?.link}
              placeholder="Doc URL"
              className="input input-bordered input-success"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">
                Doc Privacy
              </span>
            </label>
            <select
              name="privacy"
              defaultValue={data?.privacy}
              className="select select-success w-full max-w-xs">
              <option>public</option>
              <option>private</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">
                Media Type
              </span>
            </label>
            <select
              name="media"
              defaultValue={data?.media}
              className="select select-success w-full max-w-xs">
              <option>Photo</option>
              <option>PDF</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">Category</span>
            </label>
            <select
              name="category"
              defaultValue={data?.category}
              className="select select-success w-full max-w-xs">
              <option>Routine</option>
              <option>Syllabus</option>
              <option>Other</option>
            </select>
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

export default DocEditPage;
