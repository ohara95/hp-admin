import React from "react";

export const CustomInput = ({ type, setter, state }) => {
  return (
    <input
      className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
      type={type}
      value={state}
      onChange={(e) => {
        setter(e.target.value);
      }}
    ></input>
  );
};
