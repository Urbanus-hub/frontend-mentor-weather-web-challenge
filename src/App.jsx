import StatsCard from "./components/StatsCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import DailyForecastCard from "./components/DailyForecastCard";
import { useState } from "react";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function App() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [showDays, setShowDays] = useState(false);


  return (
    <>
      <div className="h-[98vh] flex flex-col items-center justify-between mb-20  ">
        <header className="w-full  mx-auto h-[7vh] flex items-center justify-between mb-10 lg:w-[80%] ">
          <img
            src="images/logo.svg"
            alt="location icon"
            className="w-38 h-38 lg:w-48 lg:h-48"
          />

          <div className="flex bg-[#252540] p-2 rounded-lg text-white gap-1.5 items-center justify-between  ">
            <img src="images/icon-units.svg" alt="unit icon" />
            <p className="text-sm">Units</p>
            <img src="images/icon-dropdown.svg" alt="dropdown icon" />
          </div>
        </header>
        <main className="w-full mx-auto min-h-[70vh]  lg:h-[80vh] lg:w-[80%]">
          <div className="flex flex-col items-center justify-center w-full lg:w-[80%] mx-auto ">
            <h1 className="text-3xl text-white  mb-6 text-center px-9 tracking-wider leading-14 font-black w-[80%] lg:text-5xl lg:w-full">
              How's the sky looking today?
            </h1>
            <div className="flex flex-col w-full items-center  lg:flex-row lg:w-[70%] lg:justify-center lg:items-center ">
              <div className="w-full h-13 flex  items-center justify-between bg-[#252540] rounded-xl py-4 px-7 gap-x-3.5 mb-3.5 lg:w-[60%]  lg:justify-start lg:mb-0 lg:px-5">
                <img src="images/icon-search.svg" alt="" className="w-5 h-5" />
                <input
                  type="text"
                  className="w-[90%] h-11 font-sans text-white outline-none lg:text-lg lg:w-[75%] bg-transparent"
                  placeholder="Search for a place..."
                />
              </div>
              <button className="w-full h-13 text-white bg-[#4657D9] hover:bg-[#2036da] transition-all duration-200 rounded-xl flex items-center justify-center lg:w-[18%] lg:ml-4 lg:mt-0 py-4 px-7">
                Search
              </button>
            </div>
          </div>
          {/* results */}
          <div className="mt-10 flex flex-col w-full  p-5  lg:mx-auto lg:py-10 lg:flex-row lg:gap-x-10 lg:justify-center lg:px-0">
            <div className="lg:w-8/12  lg:flex-col lg:items-center lg:justify-center">
              <div className="w-full h-[45vh] relative flex flex-col items-center justify-center rounded-2xl overflow-hidden ">
                <img
                  src="images/bg-today-small.svg"
                  alt="bg small"
                  className="w-full absolute inset-0 z-1 md:hidden"
                />
                <img
                  src="images/bg-today-large.svg"
                  alt="bg small"
                  className="w-full absolute inset-0 z-1 hidden md:block"
                />
                {/* text */}
                <div className="w-full z-10 absolute inset-0 h-full bg-transparent rounded-2xl flex flex-col justify-center gap-y-5 lg:flex-row lg:items-center lg:gap-x-10 lg:gap-y-0 lg:justify-between">
                  <div className="w-full flex flex-col items-center gap-y-3">
                    <h2 className="text-white text-3xl font-bold tracking-wide">
                      Berlin, Germany
                    </h2>
                    <p className="text-gray-400 text-md font-medium">
                      Tuesday, Aug 5, 2025
                    </p>
                  </div>

                  <div className="w-full flex flex-row items-center justify-center gap-x-8 mx-auto">
                    <img
                      src="images/icon-sunny.webp"
                      alt="sunny"
                      className="w-30 h-30"
                    />
                    <h1 className="text-white text-7xl font-display tracking-wider leading-23">
                      68°
                    </h1>
                  </div>
                </div>
              </div>
              {/* stats */}
              {/* stats */}
              <div className="w-full h-[45vh] flex flex-wrap gap-y-1 gap-x-3 justify-center items-center lg:flex-nowrap   lg:gap-y-0 lg:h-[25%]">
                <StatsCard />
                <StatsCard />
                <StatsCard />
                <StatsCard />
              </div>

              {/* forecast */}
              <div className="mt-5 flex flex-col w-full ">
                <h2 className="text-white/95 text-1xl font-medium tracking-wide mb-6 lg:text-1.5xl">
                  Daily forecast
                </h2>

                <div className="flex px-2 flex-row flex-wrap justify-between gap-y-4 lg:max-h-full lg:gap-y-3.5 ">
                  <DailyForecastCard />
                  <DailyForecastCard />
                  <DailyForecastCard />
                  <DailyForecastCard />
                  <DailyForecastCard />
                  <DailyForecastCard />
                </div>
              </div>
            </div>
            {/* hourly forecast */}
            <div className="w-full bg-[#25253F] rounded-2xl mt-10 flex flex-col py-4 px-2  lg:w-4/12 lg:mt-0 lg:justify-around ">
              {/* #2F2F49 */}
              <div className="w-full flex flex-row px-5 justify-between items-center h-16 ">
                <h2 className="text-white/95 text-1.5xl font-medium tracking-wide ">
                  Hourly forecast
                </h2>
                <div className="relative inline-block">
                  <button
                    className=" bg-[#2F2F49] text-neutral-200 rounded-lg px-4 py-2 pr-10 w-full"
                    onClick={() => setShowDays(!showDays)}
                  >
                    {selectedDay}
                    <img
                      src="images/icon-dropdown.svg"
                      alt="dropdown icon"
                      className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
                    />
                  </button>

                  <div
                    className={`bg-[#25253F] absolute right-0 top-12 z-5 w-50  border border-[#3d3d60] rounded-md ${
                      showDays ? "inline-block" : "hidden"
                    }`}
                  >
                    {days.map((day, index) => (
                      <button
                        key={index}
                        className="text-neutral-400 p-3 w-full  hover:bg-[#2F2F49] cursor-pointer flex items-start "
                        onClick={() => {
                          setSelectedDay(day);
                          setShowDays(!showDays);
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-3.5 lg:gap-y-4 mb-4 lg:mb-0">
                {/* daily cards */}
                <HourlyForecastCard />
                <HourlyForecastCard />
                <HourlyForecastCard />
                <HourlyForecastCard />
                <HourlyForecastCard />
                <HourlyForecastCard />
                <HourlyForecastCard />
              </div>
            </div>
          </div>

          <div className="attribution text-white mt-10 text-center w-full lg:w-[80%] mx-auto py-6">
            Challenge by{" "}
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              className="text-sky-400 hover:underline"
            >
              Frontend Mentor
            </a>
            . Coded by{" "}
            <a href="#" className="text-sky-400 hover:underline">
              Urbanus Kioko
            </a>
            .
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
