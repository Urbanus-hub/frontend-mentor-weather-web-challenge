import React from "react";

const DailyForecasts = () => {
  return (
    <div className="w-full flex items-center justify-between px-4 bg-[#2F2F49] rounded-md border border-[#3d3d60]">
      <div className="flex items-center py-2 ">
        <img src="images/icon-sunny.webp" alt="" className="w-12 h-12 " />
        <h2 className="text-neutral-200 text-lg font-medium">3 PM</h2>
      </div>
      <h2 className="text-neutral-400 text-lg font-medium">68°</h2>
    </div>
  );
};

export default DailyForecasts;
