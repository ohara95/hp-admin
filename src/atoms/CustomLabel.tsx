import React, { FC } from "react";

type Props = {
  text: string;
  size?: string;
};
const CustomLabel: FC<Props> = ({ text, size = "l" }) => {
  return (
    <>
      <label className={`block text-gray-700 text-${size} font-bold mb-2`}>
        {text}
      </label>
    </>
  );
};

export default CustomLabel;
