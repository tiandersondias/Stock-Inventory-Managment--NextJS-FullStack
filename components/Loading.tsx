import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loading;
