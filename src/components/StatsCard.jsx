import React from "react";

const StatsCard = () => {
  return (
    <div className="w-[48%] h-[20vh] bg-[#252540] rounded-xl flex flex-col p-4 gap-4 justify-center ">
      <p className="text-neutral-400 text-md font-medium">Feels Like</p>
      <h2 className="text-white text-3xl font-medium tracking-wide">68°</h2>
    </div>
  );
};

export default StatsCard;
