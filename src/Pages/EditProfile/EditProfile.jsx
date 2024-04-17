import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InputField from "./InputField";
import Swal from "sweetalert2";
import Title from "../../Components/Title";
import { AuthContext } from "../../Providers/AuthProvider";

const EditProfile = () => {
  const { student: user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleUpdateTexts = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedUser = {
      name: form.name.value,
      bio: form.bio.value,
      description: form.description.value,
      college: form.college.value,
      phone: form.phone.value == "0" ? "Hidden" : form.phone.value,
      telegram: form.telegram.value == "0" ? "Hidden" : form.telegram.value,
      facebook: form.facebook.value,
      skills: form.skills.value == "none" ? "" : form.skills.value,
      blood_group: form.blood_group.value,
      present_address: form.present_address.value,
      varsity_bus: form.varsity_bus.value,
      home_district: form.home_district.value,
      date_of_birth: form.date_of_birth.value,
      photoURL: form.photoURL.value,
    };
    axiosSecure
      .put(`/student/${user.std_id}`, updatedUser)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: `Successfully updated the profile of ${user.name}`,
            icon: "success",
          });
          navigate("/members");
        } else {
          Swal.fire({
            title: "Oops,Sorry!",
            text: `Could not update the profile of ${user.name}`,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          title: "Oops,Sorry!",
          text: `Could not update the profile of ${user.name}`,
          icon: "error",
        });
      });
  };
  return (
    <div className="relative bg-base-300/50 backdrop-blur-md h-full min-h-screen px-2 flex flex-col items-center justify-center py-7 space-y-5 rounded-t-lg">
      <Title>Edit Profile of {user.name}</Title>
      <div className="card shrink-0 flex items-center justify-center w-full max-w-4xl shadow-2xl bg-base-100">
        {/* Profile Editing Form */}
        <form
          onSubmit={handleUpdateTexts}
          className="card-body w-full md:min-w-[460px] grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-7">
          {/* Name */}
          <InputField
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            defaultVal={user.name}></InputField>
          {/* Facebook */}
          <InputField
            name="facebook"
            label="Facebook ID link"
            placeholder="Facebook ID link"
            type="url"
            defaultVal={user.facebook}></InputField>
          {/* Bio */}
          <InputField
            name="bio"
            label="Bio"
            placeholder="Bio"
            type="text"
            defaultVal={user.bio}></InputField>
          {/* College */}
          <InputField
            name="college"
            label="College"
            placeholder="College"
            type="text"
            defaultVal={user.college}></InputField>
          {/* Present Address */}
          <InputField
            name="present_address"
            label="Present Address"
            placeholder="Present Address"
            type="textarea"
            defaultVal={user.present_address}></InputField>
          {/* Home District */}
          <InputField
            name="home_district"
            label="Home District"
            placeholder="Home District"
            type="text"
            defaultVal={user.home_district}></InputField>
          {/* Blood Group */}
          <div className="form-control">
            <div className="label">
              <span className="label-text text-primary font-bold">
                Blood Group
              </span>
            </div>
            <select
              name="blood_group"
              className="select select-primary w-full max-w-xs"
              defaultValue={user.blood_group}>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                <option
                  key={bg}
                  selected={user.blood_group == bg ? true : false}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <InputField
            name="skills"
            label="Skills"
            placeholder="Skills"
            type="text"
            defaultVal={user.skills}></InputField>
          {/* Varsity Bus */}
          <InputField
            name="varsity_bus"
            label="Varsity Bus"
            placeholder="Varsity Bus"
            type="text"
            defaultVal={user.varsity_bus}></InputField>
          {/* Phone */}
          <InputField
            name="phone"
            label="Phone"
            placeholder="Phone"
            type="number"
            defaultVal={user.phone}></InputField>
          {/*Telegram*/}
          <InputField
            name="telegram"
            label="Telegram"
            placeholder="Telegram"
            type="number"
            defaultVal={user.telegram}></InputField>
          {/*Photo URL*/}
          <InputField
            name="photoURL"
            label="Photo URL"
            placeholder="Photo URL"
            type="url"
            defaultVal={user.photoURL}></InputField>
          {/* Description */}
          <label className="form-control">
            <div className="label">
              <span className="label-text text-primary font-bold">
                Description
              </span>
            </div>
            <textarea
              name="description"
              className="textarea textarea-bordered h-24"
              defaultValue={user.description}
              placeholder="Description"></textarea>
          </label>
          <div className="form-control">
            <input
              type="date"
              className="py-2 px-3 text-lg  w-full rounded-md text-gray-500 border border-gray-300"
              placeholder="dd-mm-yyyy"
              defaultValue={user.date_of_birth}
              name="date_of_birth"
              id=""
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-secondary text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
