import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminTitle from "../../../Components/AdminTitle";
import Swal from "sweetalert2";
import { FaChevronLeft } from "react-icons/fa";

const AddLinkPage = () => {
  const id = useParams().id;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const addHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const link = form.link.value;
    const access = form.access.value;
    const iat = new Date();

    const newLink = {
      title: title,
      access: access,
      link: link,
      iat: iat,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "This will add the link to resources",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure
          .post(`/admin/addLink`, newLink)
          .then((res) => {
            if (res.data.acknowledged) {
              setLoading(false);
              Swal.fire({
                title: "Successful!",
                text: "Your link has been Added!",
                icon: "success",
              });

              navigate("/admin/resources");
            } else {
              setLoading(false);
              Swal.fire({
                title: "Failed!",
                text: "Couldn't add the link",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            Swal.fire({
              title: "Failed!",
              text: "Couldn't add the link",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center py-5 space-y-5">
      <AdminTitle>Add a Link</AdminTitle>
      <div className="w-full flex items-center justify-between px-3">
        <Link
          className="rounded-full p-2 border border-base-content/60"
          to="/admin/resources">
          <FaChevronLeft></FaChevronLeft>
        </Link>
      </div>
      <form className="card-body w-full" onSubmit={addHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
          {/* Title */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="text-lg label-text text-success">
                Link Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Link Title"
              className="input input-bordered input-success"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">Link URL</span>
            </label>
            <input
              type="text"
              name="link"
              placeholder="Link URL"
              className="input input-bordered input-success"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg label-text text-success">
                Link Privacy
              </span>
            </label>
            <select
              name="access"
              className="select select-success w-full max-w-xs">
              <option>public</option>
              <option>private</option>
            </select>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-success text-white mb-3 " type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinkPage;
