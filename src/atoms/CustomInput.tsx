import React, { FC } from "react";

type Props = {
  type:
    | "text"
    | "number"
    | "tel"
    | "email"
    | "url"
    | "password"
    | "search"
    | "reset"
    | "submit"
    | "image"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "radio"
    | "checkbox"
    | "hidden"
    | "button"
    | "color"
    | "file"
    | "rage";
  setter: (param: string) => void;
  state: string;
};

export const CustomInput: FC<Props> = ({ type, setter, state }) => {
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
