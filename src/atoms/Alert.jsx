import React from "react";

export const Alert = ({ title, text, icon }) => {
  return (
    <>
      <div class="shadow" role="alert">
        <div class="flex">
          <div class="bg-blue-500 w-16 text-center p-2">
            <div class="flex justify-center h-full items-center">
              <i class="text-white">{icon}</i>
            </div>
          </div>
          <div class="bg-white border-r-4 border-blue-400 w-full p-4">
            <div>
              <p class="text-gray-600 font-bold">{title}</p>
              <p class="text-gray-600 text-sm">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
