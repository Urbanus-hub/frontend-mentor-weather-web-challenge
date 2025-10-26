import StatsCard from "./components/StatsCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import DailyForecastCard from "./components/DailyForecastCard";
import { useState, useEffect } from "react";
import { getCoordinates, getWeatherData } from "./utils/api";
import { useDebounce } from "./hooks/useDebounce";

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
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");
  const [windUnit, setWindUnit] = useState("Km/h");
  const [precipitationUnit, setPrecipitationUnit] = useState("mm");
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [query, setQuery] = useState("Berlin, Germany");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    name: "Berlin",
    country: "Germany",
    latitude: 52.52,
    longitude: 13.405,
  });
  const [locationSelected, setLocationSelected] = useState(true);

  // New state for weather data
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  // Fetch weather data for Berlin on component mount
  useEffect(() => {
    const fetchDefaultWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { latitude, longitude } = selectedLocation;
        const result = await getWeatherData(latitude, longitude);
        setWeatherData(result);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultWeatherData();
  }, []); // Empty dependency array means this runs once on mount

  // Function to convert temperature based on user preference
  const convertTemperature = (temp) => {
    if (temperatureUnit === "Fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  // Function to convert wind speed based on user preference
  const convertWindSpeed = (speed) => {
    if (windUnit === "Mph") {
      return Math.round(speed * 0.621371);
    }
    return Math.round(speed);
  };

  // Function to convert precipitation based on user preference
  const convertPrecipitation = (precip) => {
    if (precipitationUnit === "in") {
      return (precip * 0.0393701).toFixed(2);
    }
    return precip.toFixed(1);
  };

  // Function to get weather icon based on weather code
  // Function to get weather icon based on weather code
  const getWeatherIcon = (weatherCode, isDay) => {
    // Clear sky
    if (weatherCode === 0) {
      return isDay ? "images/icon-sunny.webp" : "images/icon-moon.webp";
    }

    // Mainly clear, partly cloudy, and overcast
    if (weatherCode >= 1 && weatherCode <= 3) {
      return isDay
        ? "images/icon-partly-cloudy.webp"
        : "images/icon-partly-cloudy.webp";
    }

    // Fog and depositing rime fog
    if (weatherCode === 45 || weatherCode === 48) {
      return "images/icon-fog.webp";
    }

    // Drizzle and Freezing Drizzle
    if (weatherCode >= 51 && weatherCode <= 57) {
      return "images/icon-drizzle.webp";
    }

    // Rain and Freezing Rain
    if (weatherCode >= 61 && weatherCode <= 67) {
      return "images/icon-rain.webp";
    }

    // Snow fall and Snow grains
    if (weatherCode >= 71 && weatherCode <= 77) {
      return "images/icon-snow.webp";
    }

    // Rain showers
    if (weatherCode >= 80 && weatherCode <= 82) {
      return "images/icon-rain.webp";
    }

    // Snow showers
    if (weatherCode === 85 || weatherCode === 86) {
      return "images/icon-snow.webp";
    }

    // Thunderstorm
    if (weatherCode >= 95 && weatherCode <= 99) {
      return "images/icon-storm.webp";
    }

    // Default fallback
    return isDay ? "images/icon-sunny.webp" : "images/icon-sunny.webp";
  };

  // Function to format time
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  };

  // Function to format date
  const formatDate = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get current date
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleGetSuggestions = async (coordinateQuery) => {
    try {
      const results = await getCoordinates(coordinateQuery);
      console.log("Coordinates for", coordinateQuery, ":", results);
      return results;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!locationSelected && debouncedQuery.length > 0) {
        console.log("Fetching suggestions for:", debouncedQuery);
        const results = await handleGetSuggestions(debouncedQuery);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, locationSelected]);

  const buttonBase =
    "w-full rounded-md text-start px-2 py-1.5 transition-colors flex items-center justify-between group";

  const activeClasses = "bg-[#2F2F49] text-neutral-200";
  const inactiveClasses =
    "text-neutral-400 hover:bg-[#2F2F49] hover:text-neutral-200";

  const setCoordinates = (choice) => {
    console.log("Selected coordinates:", choice);
    setQuery(`${choice.name}, ${choice.country}`);
    setSelectedLocation(choice);
    setLocationSelected(true);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    if (selectedLocation) {
      setLoading(true);
      setError(null);

      try {
        console.log("Searching for:", selectedLocation);
        const { latitude, longitude } = selectedLocation;
        const result = await getWeatherData(latitude, longitude);
        console.log("Weather data for selected location:", result);
        setWeatherData(result);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No location selected");
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (locationSelected) {
      setLocationSelected(false);
      setSelectedLocation(null);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUnitDropdown && !event.target.closest(".unit-dropdown")) {
        setShowUnitDropdown(false);
      }
      if (showDays && !event.target.closest(".day-selector")) {
        setShowDays(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUnitDropdown, showDays]);

  return (
    <>
      <div className="h-[98vh] flex flex-col items-center justify-between mb-20">
        <header className="w-full mx-auto h-[7vh] flex items-center justify-between mb-10 lg:w-[80%] relative">
          <img
            src="images/logo.svg"
            alt="location icon"
            className="w-38 h-38 lg:w-48 lg:h-48"
          />

          <div className="unit-dropdown relative">
            <button
              className="flex bg-[#252540] p-2 rounded-lg text-white gap-1.5 items-center justify-between lg:gap-3 lg:p-3 cursor-pointer"
              onClick={() => setShowUnitDropdown(!showUnitDropdown)}
            >
              <img src="images/icon-units.svg" alt="unit icon" />
              <p className="text-sm">Units</p>
              <img src="images/icon-dropdown.svg" alt="dropdown icon" />
            </button>

            <div
              className={`z-10 absolute right-0 top-13 w-40 h-auto bg-[#252540] border border-[#32324a] rounded-lg flex flex-col sm:w-44 md:w-48 lg:w-50 lg:top-14 xl:w-56 ${
                showUnitDropdown ? "block" : "hidden"
              }`}
            >
              <div className="px-2 sm:px-3 pt-2 sm:pt-3 pb-2">
                <h2 className="text-sm sm:text-md text-neutral-200 font-normal tracking-normal">
                  Switch to Imperial
                </h2>
              </div>

              {/* Temperature */}
              <div className="w-full flex flex-col border-b border-amber-50/20">
                <div className="px-2 sm:px-3 pt-2 pb-3">
                  <p className="text-xs sm:text-sm text-neutral-400 mb-2">
                    Temperature
                  </p>

                  {["Celsius", "Fahrenheit"].map((unit) => (
                    <button
                      key={unit}
                      className={`${buttonBase} ${
                        temperatureUnit === unit
                          ? activeClasses
                          : inactiveClasses
                      }`}
                      onClick={() => setTemperatureUnit(unit)}
                    >
                      <span className="text-xs sm:text-sm">
                        {unit === "Celsius"
                          ? "Celsius (°C)"
                          : "Fahrenheit (°F)"}
                      </span>
                      <img
                        src="images/icon-checkmark.svg"
                        alt="icon check"
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          temperatureUnit === unit ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Wind Speed */}
              <div className="w-full flex flex-col border-b border-amber-50/20">
                <div className="px-2 sm:px-3 pt-2 pb-3">
                  <p className="text-xs sm:text-sm text-neutral-400 mb-2">
                    Wind speed
                  </p>

                  {["Km/h", "Mph"].map((unit) => (
                    <button
                      key={unit}
                      className={`${buttonBase} ${
                        windUnit === unit ? activeClasses : inactiveClasses
                      }`}
                      onClick={() => setWindUnit(unit)}
                    >
                      <span className="text-xs sm:text-sm">{unit}</span>
                      <img
                        src="images/icon-checkmark.svg"
                        alt="icon check"
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          windUnit === unit ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Precipitation */}
              <div className="w-full flex flex-col">
                <div className="px-2 sm:px-3 pt-2 pb-3">
                  <p className="text-xs sm:text-sm text-neutral-400 mb-2">
                    Precipitation
                  </p>

                  {["mm", "in"].map((unit) => (
                    <button
                      key={unit}
                      className={`${buttonBase} ${
                        precipitationUnit === unit
                          ? activeClasses
                          : inactiveClasses
                      }`}
                      onClick={() => setPrecipitationUnit(unit)}
                    >
                      <span className="text-xs sm:text-sm">{unit}</span>
                      <img
                        src="images/icon-checkmark.svg"
                        alt="icon check"
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          precipitationUnit === unit
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full mx-auto min-h-[70vh] lg:h-[80vh] lg:w-[80%]">
          <div className="flex flex-col items-center justify-center w-full lg:w-[80%] mx-auto">
            <h1 className="text-3xl text-white mb-6 text-center px-9 tracking-wider leading-14 font-black w-[80%] lg:text-5xl lg:w-full">
              How's the sky looking today?
            </h1>

            <div className="flex flex-col w-full items-center lg:flex-row lg:w-[70%] lg:justify-center lg:items-center relative">
              <div className="w-full h-13 flex items-center justify-between bg-[#252540] rounded-xl py-4 px-7 gap-x-3.5 mb-3.5 lg:w-[60%] lg:justify-start lg:mb-0 lg:px-5">
                <img src="images/icon-search.svg" alt="" className="w-5 h-5" />
                <input
                  type="text"
                  className="w-[90%] h-11 font-sans text-white outline-none lg:text-lg lg:w-[75%] bg-transparent"
                  placeholder="Search for a place..."
                  value={query}
                  onChange={handleInputChange}
                />
              </div>

              {/* suggestions */}
              <div className="left-0 absolute top-16 z-20 w-full h-[20vh] lg:w-[64%] lg:left-13.5 px-3 overflow-y-scroll">
                {query?.length > 0 && suggestions?.length > 0 && (
                  <ul className="bg-[#252540] rounded-xl py-2 px-2">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-white hover:bg-[#2F2F49] hover:rounded-md transition-all duration-200 cursor-pointer"
                        onClick={() => setCoordinates(suggestion)}
                      >
                        {suggestion.name}, {suggestion.country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                className="w-full h-13 text-white bg-[#4657D9] hover:bg-[#2036da] transition-all duration-200 rounded-xl flex items-center justify-center lg:w-[18%] lg:ml-4 lg:mt-0 py-4 px-7 cursor-pointer"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? "Loading..." : "Search"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* results */}
          <div className="mt-10 flex flex-col w-full lg:mx-auto lg:py-10 lg:flex-row lg:gap-x-10 lg:justify-center lg:px-0 lg:h-[150vh] lg:overflow-scroll">
            <div className="lg:w-8/12 lg:flex-col lg:items-center lg:justify-center">
              <div className="w-full h-[45vh] relative flex flex-col items-center justify-center rounded-2xl overflow-hidden">
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
                      {selectedLocation
                        ? `${selectedLocation.name}, ${selectedLocation.country}`
                        : "Berlin, Germany"}
                    </h2>
                    <p className="text-gray-400 text-md font-medium">
                      {weatherData ? getCurrentDate() : "Tuesday, Aug 5, 2025"}
                    </p>
                  </div>

                  <div className="w-full flex flex-row items-center justify-center gap-x-8 mx-auto">
                    {weatherData ? (
                      <>
                        <img
                          src={getWeatherIcon(
                            weatherData.current.weather_code,
                            weatherData.current.is_day
                          )}
                          alt="weather"
                          className="w-30 h-30"
                        />
                        <h1 className="text-white text-7xl font-display tracking-wider leading-23">
                          {convertTemperature(
                            weatherData.current.temperature_2m
                          )}
                          °
                        </h1>
                      </>
                    ) : (
                      <>
                        <img
                          src="images/icon-sunny.webp"
                          alt="sunny"
                          className="w-30 h-30"
                        />
                        <h1 className="text-white text-7xl font-display tracking-wider leading-23">
                          68°
                        </h1>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* stats */}
              <div className="w-full h-[45vh] flex flex-wrap gap-y-1 gap-x-3 justify-center items-center lg:flex-nowrap lg:gap-y-0 lg:h-[25%]">
                {loading ? (
                  // Show skeleton cards while loading
                  <>
                    <StatsCard isLoading={true} />
                    <StatsCard isLoading={true} />
                    <StatsCard isLoading={true} />
                    <StatsCard isLoading={true} />
                  </>
                ) : weatherData ? (
                  // Show actual data when available
                  <>
                    <StatsCard
                      title="Feels Like"
                      value={`${convertTemperature(
                        weatherData.current.apparent_temperature
                      )}°`}
                    />
                    <StatsCard
                      title="Humidity"
                      value={`${weatherData.current.relative_humidity_2m}%`}
                    />
                    <StatsCard
                      title="Wind Speed"
                      value={`${convertWindSpeed(
                        weatherData.current.wind_speed_10m
                      )} ${windUnit}`}
                    />
                    <StatsCard
                      title="Pressure"
                      value={`${weatherData.current.pressure_msl} hPa`}
                    />
                  </>
                ) : (
                  // Show default cards when no data is available
                  <>
                    <StatsCard />
                    <StatsCard />
                    <StatsCard />
                    <StatsCard />
                  </>
                )}
              </div>

              {/* forecast */}
              <div className="mt-5 flex flex-col w-full">
                <h2 className="text-white/95 text-1xl font-medium tracking-wide mb-6 lg:text-1.5xl">
                  Daily forecast
                </h2>

                <div className="flex px-2 flex-row flex-wrap justify-between gap-y-4 lg:max-h-full lg:gap-y-3.5">
                  {loading ? (
                    // Show skeleton cards while loading
                    <>
                      <DailyForecastCard isLoading={true} />
                      <DailyForecastCard isLoading={true} />
                      <DailyForecastCard isLoading={true} />
                      <DailyForecastCard isLoading={true} />
                      <DailyForecastCard isLoading={true} />
                      <DailyForecastCard isLoading={true} />
                    </>
                  ) : weatherData ? (
                    // Show actual data when available
                    weatherData.daily.time.map((date, index) => (
                      <DailyForecastCard
                        key={index}
                        day={formatDate(date)}
                        icon={getWeatherIcon(
                          weatherData.daily.weather_code[index],
                          1
                        )}
                        highTemp={convertTemperature(
                          weatherData.daily.temperature_2m_max[index]
                        )}
                        lowTemp={convertTemperature(
                          weatherData.daily.temperature_2m_min[index]
                        )}
                      />
                    ))
                  ) : (
                    // Show default cards when no data is available
                    <>
                      <DailyForecastCard />
                      <DailyForecastCard />
                      <DailyForecastCard />
                      <DailyForecastCard />
                      <DailyForecastCard />
                      <DailyForecastCard />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* hourly forecast */}
            <div className="w-full bg-[#25253F] rounded-2xl mt-10 flex flex-col py-4 px-2 lg:w-4/12 lg:mt-0 lg:justify-around">
              <div className="w-full flex flex-row px-5 justify-between items-center h-16 mb-3">
                <h2 className="text-white/95 text-1.5xl font-medium tracking-wide">
                  Hourly forecast
                </h2>
                <div className="day-selector relative inline-block">
                  <button
                    className="bg-[#2F2F49] text-neutral-200 rounded-lg px-4 py-2 pr-10 w-full"
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
                    className={`bg-[#25253F] absolute right-0 top-12 z-5 w-50 border border-[#3d3d60] rounded-md ${
                      showDays ? "inline-block" : "hidden"
                    }`}
                  >
                    {days.map((day, index) => (
                      <button
                        key={index}
                        className="text-neutral-400 p-3 w-full hover:bg-[#2F2F49] cursor-pointer flex items-start"
                        onClick={() => {
                          setSelectedDay(day);
                          setShowDays(false);
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-3.5 lg:gap-y-4 mb-4 lg:mb-0 overflow-y-scroll lg:h-[130vh]">
                {/* hourly cards */}
                {loading ? (
                  // Show skeleton cards while loading
                  <>
                    <HourlyForecastCard isLoading={true} />
                    <HourlyForecastCard isLoading={true} />
                    <HourlyForecastCard isLoading={true} />
                    <HourlyForecastCard isLoading={true} />
                    <HourlyForecastCard isLoading={true} />
                    <HourlyForecastCard isLoading={true} />
                    <HourlyForecastCard isLoading={true} />
                  </>
                ) : weatherData ? (
                  // Show actual data when available
                  weatherData.hourly.time
                    .slice(0, 24)
                    .map((time, index) => (
                      <HourlyForecastCard
                        key={index}
                        time={formatTime(time)}
                        icon={getWeatherIcon(
                          weatherData.hourly.weather_code[index],
                          1
                        )}
                        temperature={convertTemperature(
                          weatherData.hourly.temperature_2m[index]
                        )}
                      />
                    ))
                ) : (
                  // Show default cards when no data is available
                  <>
                    <HourlyForecastCard />
                    <HourlyForecastCard />
                    <HourlyForecastCard />
                    <HourlyForecastCard />
                    <HourlyForecastCard />
                    <HourlyForecastCard />
                    <HourlyForecastCard />
                  </>
                )}
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
