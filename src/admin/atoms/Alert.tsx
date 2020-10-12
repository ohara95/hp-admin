import React, { FC } from "react";

type Props = {
  text: string;
  icon: "fas fa-exclamation-circle" | "fas fa-question-circle";
};
const Alert: FC<Props> = ({ text, icon }) => {
  return (
    <>
      <div role="alert">
        <div className="flex h-8">
          <div className="bg-blue-500 w-10 text-center p-2 ">
            <div className="flex justify-center h-full items-center">
              <i className={`text-white text-xl ${icon}`}></i>
            </div>
          </div>
          <div className="bg-white border-r-4 border-blue-400 p-1">
            <div>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
