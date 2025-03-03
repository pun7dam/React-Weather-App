import { useState, useEffect } from "react";
import { Search } from "./components/Search";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyWeatherItem } from "./components/HourlyWeatherItem";
import { weatherCodes } from "./constant";
import Loader from "./components/Loader";

function App() {
  const [location, setLocation] = useState("Sydney"); // Default location
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const [cityName, setCityName] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // Function to get the user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = `${position.coords.latitude},${position.coords.longitude}`;
            setLocation(userLocation);
            fetchWeatherData(userLocation);
          },
          (error) => {
            console.error("Error getting user location:", error);
            fetchWeatherData(location); // Use default location if unable to get user location
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        fetchWeatherData(location); // Use default location if geolocation is not supported
      }
    };
    getUserLocation();

    const fetchWeatherData = async (location) => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}`
        );
        const data = await response.json();

        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const city = data.location.tz_id;

        const cityAfterSlash = city.split("/")[1];
        setCityName(cityAfterSlash);

        const weatherIcon = Object.keys(weatherCodes).find((icon) =>
          weatherCodes[icon].includes(data.current.condition.code)
        );

        setCurrentWeather({
          temperature,
          description,
          weatherIcon,
          city,
        });
        filterHourlyForecast(data.forecast.forecastday[0].hour);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  }, []);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hour = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const foreCastTime = new Date(time).getTime();
      return foreCastTime >= currentHour && foreCastTime <= next24Hour;
    });
    setHourlyForecast(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const city = data.location.tz_id;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );
      console.log(temperature, description, weatherIcon);
      setCurrentWeather({
        temperature,
        description,
        weatherIcon,
        city,
      });
      const combineHourData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      filterHourlyForecast(combineHourData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      {/* This is a search section */}
      <Search
        getWeatherDetails={getWeatherDetails}
        cityName={cityName}
        setCityName={setCityName}
      />

      <div className="weather-section">
        {/* This is a current weather section */}
        {currentWeather.city != null ? (
          <CurrentWeather currentWeather={currentWeather} />
        ) : (
          <Loader />
        )}

        {/* This is a hourly forecast */}
        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecast.length > 0 &&
              hourlyForecast.map((objHour) => (
                <HourlyWeatherItem key={objHour.time_epoch} objHour={objHour} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
