import React from "react";

const IconPop = ({ color, icon, text, children }) => (
  <div class="bg-white rounded p-2 ">
    <div class="flex flex-row items-center">
      <div class="flex-shrink">
        <div class={`rounded p-5 bg-${color}-600`}>
          <i class={`${icon} text-white`} />
        </div>
      </div>
      <div class="flex-1 md:text-center">
        <h5 class="block text-gray-700 text-sm font-bold mb-2">{text}</h5>
        <h3 class="font-bold text-3xl">{children}</h3>
      </div>
    </div>
  </div>
);

export default IconPop;
