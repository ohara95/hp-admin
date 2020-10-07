import React, { FC } from "react";

type Props = {
  text: string;
  value?: string;
  onChange?: (
    e:
      | React.FormEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
const CustomButton: FC<Props> = ({ text, value, onChange }) => {
  return (
    <button
      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
      value={value}
      onChange={onChange}
    >
      {text}
    </button>
  );
};

export default CustomButton;
