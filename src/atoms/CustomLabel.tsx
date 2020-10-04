import React, { FC } from "react";

type Props = {
  text: string;
};
const CustomLabel: FC<Props> = ({ text }) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text}
      </label>
    </>
  );
};

export default CustomLabel;
