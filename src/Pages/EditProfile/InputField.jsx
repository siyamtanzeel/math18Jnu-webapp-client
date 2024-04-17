import React from "react";

const InputField = ({ name, label, placeholder, defaultVal, type }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-primary font-bold">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered"
        defaultValue={defaultVal}
        required
        name={name}
      />
    </div>
  );
};

export default InputField;
