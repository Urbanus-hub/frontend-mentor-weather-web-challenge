import React from "react";

const HourlyForecastCard = ({ 
  time = "3 PM", 
  icon = "images/icon-sunny.webp", 
  temperature = 68,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-between px-5 bg-[#2F2F49] rounded-md border border-[#3d3d60] animate-pulse">
        <div className="flex items-center py-2 lg:py-3">
          <div className="w-12 h-12 lg:h-14 lg:w-14 bg-gray-600 rounded-full mr-3"></div>
          <div className="h-5 w-16 bg-gray-600 rounded"></div>
        </div>
        <div className="h-5 w-8 bg-gray-600 rounded"></div>
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-between px-5 bg-[#2F2F49] rounded-md border border-[#3d3d60] hover:bg-[#3a3a59] transition-all duration-200">
      <div className="flex items-center py-1 ">
        <img src={icon} alt="weather icon" className="w-12 h-12 lg:h-14 lg:w-14" />
        <h2 className="text-neutral-200 text-lg lg:text-xl font-medium ml-3">{time}</h2>
      </div>
      <h2 className="text-neutral-400 text-lg lg:text-xl font-medium">{temperature}°</h2>
    </div>
  );
};

export default HourlyForecastCard;