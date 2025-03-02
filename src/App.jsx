import { useState } from "react";
import { SearchSection } from "./components/search";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyWeatherItem } from "./components/HourlyWeatherItem";
import { weatherCodes } from "./constant";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);

      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );
      console.log(temperature, description, weatherIcon);
      setCurrentWeather({
        temperature,
        description,
        weatherIcon,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      {/* This is a search section */}
      <SearchSection getWeatherDetails={getWeatherDetails} />

      <div className="weather-section">
        {/* This is a current weather section */}
        <CurrentWeather currentWeather={currentWeather} />

        {/* This is a hourly forecast */}
        <div className="hourly-forecast">
          <ul className="weather-list">
            <HourlyWeatherItem />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
