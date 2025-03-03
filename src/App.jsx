import { useState, useEffect } from "react";
import { Search } from "./components/search";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyWeatherItem } from "./components/HourlyWeatherItem";
import { weatherCodes } from "./constant";
import Loader from "./components/Loader";

function App() {
  const LOADER_TIME = 300;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [location, setLocation] = useState("Sydney"); // Default location
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const [cityName, setCityName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Function to get the user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = `${position.coords.latitude},${position.coords.longitude}`;
            setLocation(userLocation);
            fetchWeatherData(userLocation);
            setErrorMessage("");
          },
          (error) => {
            console.error("Error getting user location:", error);
            setErrorMessage(error.message);
            fetchWeatherData(location); // Use default location if unable to get user location
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setErrorMessage(
          "Geolocation is not supported by this browser.Message: ",
          error.message
        );
        fetchWeatherData(location); // Use default location if geolocation is not supported
      }
    };
    getUserLocation();

    const fetchWeatherData = async (location) => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=2`
        );
        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: Failed to fetch weather data`
          );
        }
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

        const combineHourData = [
          ...data.forecast.forecastday[0].hour,
          ...data.forecast.forecastday[1].hour,
        ];
        filterHourlyForecast(combineHourData);

        // show loader for seconds
        setTimeout(() => {
          setLoading(false);
        }, LOADER_TIME);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setErrorMessage(error.message);
        setError(true);
        // show loader for seconds
        setTimeout(() => {
          setLoading(false);
        }, LOADER_TIME);
      }
    };
  }, []);

  const filterHourlyForecast = (dataHourly) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hour = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = dataHourly.filter(({ time }) => {
      const foreCastTime = new Date(time).getTime();
      return foreCastTime >= currentHour && foreCastTime <= next24Hour;
    });

    setHourlyForecast(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const city = data.location.tz_id;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

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

      setTimeout(() => {
        setLoading(false); // Stop the loader
      }, LOADER_TIME);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderWeatherContent = () => {
    if (loading) return <Loader />; // Show loader first
    if (error || !currentWeather.temperature)
      return (
        <p className="error-message">{errorMessage || "Error fetching data"}</p>
      );
    return <CurrentWeather currentWeather={currentWeather} />;
  };

  const renderHourlyForecast = () => {
    if (loading) return null; // Don't show anything while loading
    if (error || hourlyForecast.length === 0)
      return <p className="error-message">No hourly forecast available</p>;

    return hourlyForecast.map((objHour) => (
      <HourlyWeatherItem key={objHour.time_epoch} objHour={objHour} />
    ));
  };

  return (
    <div className="container">
      {/* This is a search section */}
      <Search
        getWeatherDetails={getWeatherDetails}
        cityName={cityName}
        setCityName={setCityName}
      />
      {/* This is a current weather section */}
      <div className="weather-section">
        {renderWeatherContent()}

        {/* This is a hourly forecast */}
        <div className="hourly-forecast">
          <ul className="weather-list">{renderHourlyForecast()}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
