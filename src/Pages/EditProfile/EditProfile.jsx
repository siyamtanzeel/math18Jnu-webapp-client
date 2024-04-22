import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InputField from "./InputField";
import Swal from "sweetalert2";
import Title from "../../Components/Title";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const { student: user, setStudent } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const performUpdate = (updatedUser) => {
    setLoading(true);
    axiosSecure
      .put(`/student/${user.std_id}`, updatedUser)
      .then((res) => {
        setLoading(false);
        if (res.data.modifiedCount > 0) {
          setStudent({ ...user, ...updatedUser });
          Swal.fire({
            title: "Updated!",
            text: `Successfully updated the profile of ${user.name}`,
            icon: "success",
          });
          navigate("/members");
        } else {
          setLoading(false);
          Swal.fire({
            title: "Oops,Sorry!",
            text: `Could not update the profile of ${user.name}`,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        Swal.fire({
          title: "Oops,Sorry!",
          text: `Could not update the profile of ${user.name}`,
          icon: "error",
        });
      });
  };
  const { register, handleSubmit } = useForm();
  const handleUpdate = (data) => {
    setLoading(true);
    if (data.photoURL.length > 0) {
      var formData = new FormData();
      formData.append("image", data.photoURL[0]);
      formData.append("key", import.meta.env.VITE_IMGBB_KEY);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          const photoURL = res.data.data.url;
          performUpdate({
            ...data,
            photoURL: photoURL || "/img/userIcon.png",
          });
        })
        .catch((err) => {
          performUpdate({ ...data, photoURL: "/img/userIcon.png" });

          console.log(err.message);
        });
    } else {
      performUpdate({ ...data, photoURL: user.photoURL });
    }

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
    <div className="relative bg-base-300/50 backdrop-blur-md h-full min-h-screen px-2 flex flex-col items-center justify-center py-7 space-y-5 rounded-t-lg">
      <Title>Edit Profile of {user?.name}</Title>
      <div className="card shrink-0 flex items-center justify-center w-full max-w-4xl shadow-2xl bg-base-100">
        {/* Profile Editing Form */}
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="card-body w-full md:min-w-[460px] grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-7">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              defaultValue={user?.name}
              {...register("name", { required: true })}
            />
          </div>
          {/* Facebook */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                Facebook ID Link
              </span>
            </label>
            <input
              type="url"
              placeholder="Facebook ID link"
              className="input input-bordered"
              defaultValue={user?.facebook}
              {...register("facebook", { required: true })}
            />
          </div>
          {/* Bio */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">Bio</span>
            </label>
            <input
              type="text"
              placeholder="bio"
              className="input input-bordered"
              defaultValue={user?.bio}
              {...register("bio", { required: true })}
            />
          </div>
          {/* College */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">College</span>
            </label>
            <input
              type="text"
              placeholder="College"
              className="input input-bordered"
              defaultValue={user?.college}
              {...register("college", { required: true })}
            />
          </div>
          {/* Present Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                Present Address
              </span>
            </label>
            <input
              type="text"
              placeholder="Present Address"
              className="input input-bordered"
              defaultValue={user?.present_address}
              {...register("present_address", { required: true })}
            />
          </div>
          {/* Home District */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                Home District
              </span>
            </label>
            <input
              type="text"
              placeholder="Home District"
              className="input input-bordered"
              defaultValue={user?.home_district}
              {...register("home_district", { required: true })}
            />
          </div>
          {/* Blood Group */}
          <div className="form-control">
            <div className="label">
              <span className="label-text text-primary font-bold">
                Blood Group
              </span>
            </div>
            <select
              {...register("blood_group", { required: true })}
              className="select select-primary w-full max-w-xs"
              defaultValue={user?.blood_group}>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                <option
                  key={bg}
                  selected={user?.blood_group == bg ? true : false}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">Skills</span>
            </label>
            <input
              type="text"
              placeholder="Skills"
              className="input input-bordered"
              defaultValue={user?.skills}
              {...register("skills", { required: true })}
            />
          </div>
          {/* Varsity Bus */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                Varsity Bus
              </span>
            </label>
            <input
              type="text"
              placeholder="Varsity Bus"
              className="input input-bordered"
              defaultValue={user?.varsity_bus}
              {...register("varsity_bus", { required: true })}
            />
          </div>
          {/* Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                Phone Number
              </span>
            </label>
            <input
              type="text"
              placeholder="Phone"
              className="input input-bordered"
              defaultValue={user?.phone}
              {...register("phone", { required: true })}
            />
          </div>
          {/*Telegram*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold"></span>
            </label>
            <input
              type="text"
              placeholder="Telegram"
              required={false}
              className="input input-bordered"
              defaultValue={user?.telegram}
              {...register("phone")}
            />
          </div>
          {/*Photo URL*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary font-bold">
                Change Photo
              </span>
            </label>
            <input
              type="file"
              {...register("photoURL")}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>
          {/* Description */}
          <label className="form-control">
            <div className="label">
              <span className="label-text text-primary font-bold">
                Description
              </span>
            </div>
            <textarea
              {...register("description")}
              defaultValue={user?.description}
              className="textarea textarea-bordered h-24"
              placeholder="Description"></textarea>
          </label>
          <div className="form-control">
            <input
              type="date"
              className="py-2 px-3 text-lg  w-full rounded-md text-gray-500 border border-gray-300"
              placeholder="dd-mm-yyyy"
              defaultValue={user?.date_of_birth}
              {...register("date_of_birth")}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
