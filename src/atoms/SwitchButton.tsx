import React, { FC } from "react";

type Props = {
  select: string;
  text: string;
  value: string;
  type?: "button" | "submit";
};

const SwitchButton: FC<Props> = ({ select, text, value, type = "button" }) => (
  <button
    className={`shadow hover:bg-gray-400 text-gray-800 ${
      select === value ? "bg-gray-400 " : "bg-gray-100"
    } font-bold py-2 px-4 rounded mr-4`}
    value={value}
    type={type}
  >
    {text}
  </button>
);

export default SwitchButton;
