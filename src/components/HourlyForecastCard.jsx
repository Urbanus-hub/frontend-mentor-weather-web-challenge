import React from "react";

const HourlyForecastCard = () => {
  return (
    <div className="w-full flex items-center justify-between px-5 bg-[#2F2F49] rounded-md border border-[#3d3d60] ">
      <div className="flex items-center py-2 lg:py-3 ">
        <img src="images/icon-sunny.webp" alt="" className="w-12 h-12 lg:h-14 lg:w-14 " />
        <h2 className="text-neutral-200 text-lg lg:text-xl font-medium">3 PM</h2>
      </div>
      <h2 className="text-neutral-400 text-lg lg:text-1xl font-medium">68°</h2>
    </div>
  );
};

export default HourlyForecastCard;
