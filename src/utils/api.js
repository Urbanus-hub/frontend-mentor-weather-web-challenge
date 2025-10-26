


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









// Alternative: More modular approach with configurable parameters
export async function getWeatherData(lat, lon, options = {}) {
  try {
    const {
      units = "metric",
      forecastDays = 7,
      includeHourly = true,
      includeDaily = true,
      timezone = "auto"
    } = options;

    // Convert units
    const tempUnit = units === "imperial" ? "fahrenheit" : "celsius";
    const windUnit = units === "imperial" ? "mph" : "kmh";
    const precipitationUnit = units === "imperial" ? "inch" : "mm";

    // Base URL
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`;

    // Current weather parameters
    const currentParams = [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m'
    ];
    url += `&current=${currentParams.join(',')}`;

    // Hourly forecast parameters
    if (includeHourly) {
      const hourlyParams = [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation_probability',
        'precipitation',
        'weather_code',
        'cloud_cover',
        'wind_speed_10m',
        'wind_direction_10m'
      ];
      url += `&hourly=${hourlyParams.join(',')}`;
    }

    // Daily forecast parameters
    if (includeDaily) {
      const dailyParams = [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'sunrise',
        'sunset',
        'uv_index_max',
        'precipitation_sum',
        'precipitation_probability_max',
        'wind_speed_10m_max',
        'wind_direction_10m_dominant'
      ];
      url += `&daily=${dailyParams.join(',')}`;
    }

    // Add units and other settings
    url += `&temperature_unit=${tempUnit}`;
    url += `&wind_speed_unit=${windUnit}`;
    url += `&precipitation_unit=${precipitationUnit}`;
    url += `&timezone=${timezone}`;
    url += `&forecast_days=${forecastDays}`;

    console.log("Fetching weather data from:", url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.current) {
      throw new Error("Invalid response from weather API");
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
