import React from "react";

const CustomLabel = ({ text }) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text}
      </label>
    </>
  );
};

export default CustomLabel;
