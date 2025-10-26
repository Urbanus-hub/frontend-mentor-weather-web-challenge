


// 1️⃣ Get coordinates (latitude & longitude) from city name
export async function getCoordinates(query) {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Location not found");
    }

   
    return data.results;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}








// 2️⃣ Fetch weather data from Open-Meteo
export async function getWeatherData(lat, lon, units = "metric") {
  try {
    // convert units for Open-Meteo
    const tempUnit = units === "imperial" ? "fahrenheit" : "celsius";
    const windUnit = units === "imperial" ? "mph" : "kmh";
    const precipitationUnit = units === "imperial" ? "inch" : "mm";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipitationUnit}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
