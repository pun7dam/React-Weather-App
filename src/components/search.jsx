import { useRef } from "react";

export const Search = ({ getWeatherDetails, cityName, setCityName }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const citySearchRef = useRef(null);

  const handleCitySearch = (e) => {
    e.preventDefault();
    const searchInputValue = citySearchRef.current.value;
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInputValue}&days=2`;
    getWeatherDetails(API_URL);
  };
  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };
  const handleClear = () => {
    setCityName("");
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">Search</span>
        <input
          type="search"
          placeholder="Enter a city name"
          value={cityName}
          required
          className="search-input"
          ref={citySearchRef}
          onChange={handleInputChange}
          onInput={handleClear}
        />
      </form>
      <button className="location-button" onClick={handleCitySearch}>
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};
