import React from 'react'

const DailyForecastCard = () => {
  return (
    <div className="w-[31%] h-[26vh] bg-[#252540] rounded-xl flex flex-col py-4 px-2 gap-2 justify-center items-center  border-2 border-[#343457] lg:w-[15%] ">
                <p className="text-neutral-400 text-md font-medium">
                  Tue
                </p>
                <img src="/images/icon-snow.webp" alt="weather-icon"  className="h-20 w-20 "/>

              
                  <div className="text-neutral-400 flex flex-row justify-around w-full "> <span>77°</span> <span>55°</span></div>
                
              </div>
  )
}

export default DailyForecastCard