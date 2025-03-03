import React from "react";

export const CurrentWeather = ({ currentWeather }) => {
  return (
    <div className="current-weather">
      <h1 className="city">{currentWeather.city}</h1>
      <img
        src={`./icons/${currentWeather.weatherIcon}.svg`}
        className="weather-icon"
      />
      <h2 className="temperature">{currentWeather.temperature}</h2>
      <p className="description">{currentWeather.description}</p>
    </div>
  );
};
