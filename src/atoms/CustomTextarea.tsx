import React, { FC } from "react";

type Props = {
  value: string | (() => string);
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  row?: number;
};

const CustomTextarea: FC<Props> = ({ value, onChange, row = 6 }) => (
  <textarea
    className="block w-full border-gray-400 border-2 rounded px-3 py-3"
    value={value as string}
    onChange={onChange}
    rows={row}
  />
);

export default CustomTextarea;
