import React from "react";

const StatsCard = ({ 
  title = "Feels Like", 
  value = "68°",
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="w-[48%] h-[20vh] bg-[#252540] rounded-xl flex flex-col p-4 gap-4 justify-center lg:py-2 lg:gap-y-0 animate-pulse">
        <div className="h-5 w-24 bg-gray-600 rounded"></div>
        <div className="h-10 w-16 bg-gray-600 rounded"></div>
      </div>
    )
  }

  return (
    <div className="w-[48%] h-[20vh] bg-[#252540] rounded-xl flex flex-col p-4 gap-4 justify-center lg:py-2 lg:gap-y-0 hover:bg-[#2a2a45] transition-all duration-200">
      <p className="text-neutral-400 text-md font-medium">{title}</p>
      <h2 className="text-white text-3xl font-medium tracking-wide">{value}</h2>
    </div>
  );
};

export default StatsCard;