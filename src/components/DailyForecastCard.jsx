import React from 'react'

const DailyForecastCard = ({ 
  day = "Tue", 
  icon = "/images/icon-snow.webp", 
  highTemp = 77, 
  lowTemp = 55,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="w-[31%] h-[26vh] bg-[#252540] rounded-xl flex flex-col py-4 px-2 gap-2 justify-center items-center border-2 border-[#343457] lg:w-[15%] animate-pulse">
        <div className="h-4 w-16 bg-gray-600 rounded"></div>
        <div className="h-20 w-20 bg-gray-600 rounded-full"></div>
        <div className="text-neutral-400 flex flex-row justify-around w-full">
          <div className="h-4 w-8 bg-gray-600 rounded"></div>
          <div className="h-4 w-8 bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[31%] h-[26vh] bg-[#252540] rounded-xl flex flex-col py-4 px-2 gap-2 justify-center items-center border-2 border-[#343457] lg:w-[15%] hover:border-[#4657D9] transition-all duration-200">
      <p className="text-neutral-400 text-md font-medium">
        {day}
      </p>
      <img src={icon} alt="weather-icon" className="h-20 w-20" />
      <div className="text-neutral-400 flex flex-row justify-around w-full">
        <span>{highTemp}°</span>
        <span>{lowTemp}°</span>
      </div>
    </div>
  )
}

export default DailyForecastCard