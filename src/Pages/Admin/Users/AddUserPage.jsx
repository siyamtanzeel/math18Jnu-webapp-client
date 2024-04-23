import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminTitle from "../../../Components/AdminTitle";

const AddUserPage = () => {
  const id = useParams().id;
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/pendingUser/${id}`);
      return res.data;
    },
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //   const performUpdate = (updatedUser) => {
  //     setLoading(true);
  //     axiosSecure
  //       .put(`/student/${user.std_id}`, updatedUser)
  //       .then((res) => {
  //         setLoading(false);
  //         if (res.data.modifiedCount > 0) {
  //           setStudent({ ...user, ...updatedUser });
  //           Swal.fire({
  //             title: "Updated!",
  //             text: `Successfully updated the profile of ${user.name}`,
  //             icon: "success",
  //           });
  //           navigate("/members");
  //         } else {
  //           setLoading(false);
  //           Swal.fire({
  //             title: "Oops,Sorry!",
  //             text: `Could not update the profile of ${user.name}`,
  //             icon: "error",
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log(err.message);
  //         Swal.fire({
  //           title: "Oops,Sorry!",
  //           text: `Could not update the profile of ${user.name}`,
  //           icon: "error",
  //         });
  //       });
  //   };
  const { register, handleSubmit } = useForm();
  const handleApproval = (e) => {
    e.preventDefault();
    const AddedPendingUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      std_id: user.std_id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `${user.name} will be added to users list and will access app features like having his/her own profile and edit that`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#e11d48",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure
          .post("/admin/addStudent", AddedPendingUser)
          .then((res) => {
            setLoading(false);
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Successfully Added!",
                text: `${AddedPendingUser.name} has been added to the app!`,
                icon: "success",
              });
              navigate("/admin/user");
            } else {
              Swal.fire({
                title: "Failed to add!",
                text: `${AddedPendingUser.name} couldn't be added to the app!`,
                icon: "error",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            Swal.fire({
              title: "Failed to add!",
              text: `${AddedPendingUser.name} couldn't be added to the app!`,
              icon: "error",
            });
          });
      }
    });
    // axiosSecure
    //   .put(`/student/${user.std_id}`, updatedUser)
    //   .then((res) => {
    //     if (res.data.modifiedCount > 0) {
    //       Swal.fire({
    //         title: "Updated!",
    //         text: `Successfully updated the profile of ${user.name}`,
    //         icon: "success",
    //       });
    //       navigate("/members");
    //     } else {
    //       Swal.fire({
    //         title: "Oops,Sorry!",
    //         text: `Could not update the profile of ${user.name}`,
    //         icon: "error",
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     Swal.fire({
    //       title: "Oops,Sorry!",
    //       text: `Could not update the profile of ${user.name}`,
    //       icon: "error",
    //     });
    //   });
  };
  if (loading) {
    return (
      <div className="relative h-screen w-full bg-base-100/50 backdrop-blur-lg flex items-center justify-center z-30">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  return (
    <div className="relative  h-full min-h-screen px-2 flex flex-col items-center justify-center py-7 space-y-5 rounded-t-lg">
      <AdminTitle>Response of {user?.name}</AdminTitle>
      <div className="card shrink-0 flex items-center justify-center w-full max-w-4xl shadow-2xl bg-base-100">
        {/* Profile Editing Form */}
        <form
          onSubmit={handleApproval}
          className="card-body w-full md:min-w-[460px] grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-7">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              disabled
              className="input input-bordered"
              defaultValue={user?.name}
            />
          </div>
          {/* Facebook */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">Email</span>
            </label>
            <input
              type="url"
              placeholder="Facebook ID link"
              className="input input-bordered"
              defaultValue={user?.email}
              disabled
              name="name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                password
              </span>
            </label>
            <input
              type="password"
              placeholder="Facebook ID link"
              className="input input-bordered"
              defaultValue={user?.password}
              disabled
            />
          </div>
          {/* Bio */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                কোন ভার্সিটির মার্কারের কালি সবচেয়ে ভালো?
              </span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.ques1}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                আমাদের প্রিয় অভিভাবক কে?
              </span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.ques2}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                ছল্লা শব্দের অর্থ কি?
              </span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.ques3}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                সব নারীর খালাতো ভাই কে?
              </span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.ques4}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                69 শুনলে কার নাম মাথায় আসে?
              </span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.ques5}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                রমণীদের সহিত কাহার খুনসুটি সবচাইতে বেশী?
              </span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.ques6}
              disabled
            />
          </div>
          {/* College */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                StudentID
              </span>
            </label>
            <input
              type="text"
              placeholder="College"
              className="input input-bordered"
              defaultValue={user?.std_id}
              disabled
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral">
              Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
