import React from "react";

const Skeleton = () => (
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-4 py-1">
      <div className="h-4 bg-gray-400 rounded w-2/4"></div>
    </div>
  </div>
);

export default Skeleton;
