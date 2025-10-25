import StatsCard from "./components/StatsCard";
import ForecastCard from "./components/ForecastCard";
function App() {
  return (
    <>
      <div className="h-[98vh] flex-col items-center justify-around mb-20 overflow-y-scroll ">
        <header className="full  mx-auto h-[7vh] flex items-center justify-between mb-10 ">
          <img
            src="images/logo.svg"
            alt="location icon"
            className="w-38 h-38"
          />

          <div className="flex bg-[#252540] p-2 rounded-lg text-white gap-1.5 items-center justify-between">
            <img src="images/icon-units.svg" alt="unit icon" />
            <p className="text-sm">Units</p>
            <img src="images/icon-dropdown.svg" alt="dropdown icon" />
          </div>
        </header>
        <main className="w-full mx-auto min-h-[70vh]  lg:h-[80vh] ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl text-white  mb-6 text-center px-5 tracking-wider leading-14">
              How's the sky looking today?
            </h1>
            <div className="w-full h-13 flex  items-center justify-between bg-[#252540] rounded-xl py-4 px-7 gap-x-3.5 mb-3.5">
              <img src="images/icon-search.svg" alt="" className="w-5 h-5" />
              <input
                type="text"
                className="w-[90%] h-11 font-sans text-white outline-none"
                placeholder="Search for a place..."
              />
            </div>
            <button className="w-full h-13 text-white bg-[#4657D9] rounded-xl flex items-center justify-center">
              Search
            </button>
          </div>
          {/* results */}
          <div className="mt-10 flex flex-col w-full">
            <div className="w-full h-[45vh] relative flex flex-col items-center justify-center rounded-2xl overflow-hidden">
              <img
                src="images/bg-today-small.svg"
                alt="bg small"
                className="w-full absolute inset-0 z-1"
              />
              {/* text */}
              <div className="w-full z-10 absolute inset-0 h-full bg-transparent rounded-2xl flex flex-col justify-center gap-y-5">
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
            <div className="w-full h-[45vh] flex flex-wrap gap-y-1 gap-x-3 justify-center items-center">
              <StatsCard />
              <StatsCard />
              <StatsCard />
              <StatsCard />
            </div>

            {/* forecast */}
            <div className="mt-5 flex flex-col w-full ">
              <h2 className="text-white/95 text-1xl font-medium tracking-wide mb-6">
                Daily forecast
              </h2>

              <div className="flex flex-row flex-wrap justify-between gap-y-4  ">
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
                <ForecastCard />
              </div>
            </div>
            {/* hourly forecast */}
            <div className="w-full bg-[#25253F] rounded-2xl mt-10 flex flex-col py-4 px-2 ">
              {/* #2F2F49 */}
              <div className="w-full flex flex-row p-2 justify-between items-center h-16 ">
                <h2 className="text-white/95 text-1.5xl font-medium tracking-wide ">
                  Hourly forecast
                </h2>
                <div className="flex bg-[#2F2F49] p-2 rounded-lg text-neutral-200 gap-1.5 items-center justify-between">

                  <p className="text-md text-neutral-400">Tuesday</p>
                  <img src="images/icon-dropdown.svg" alt="dropdown icon" />
                </div>

              </div>
              <div className="w-full flex flex-col">
                <div className="w-full ">
                  <div>
                    <img src="" alt="" />
                    h1
                  </div>

                </div>

              </div>


            </div>
          </div>
        </main>
      </div>

      <div className="attribution text-white mt-10">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Urbanus Kioko</a>.
      </div>
    </>
  );
}

export default App;
