import React from "react";

export const CurrentWeather = ({ currentWeather }) => {
  const temperature = currentWeather.temperature
    ? currentWeather.temperature + " °C"
    : "Temperature";
  const weatherIcon = currentWeather.weatherIcon
    ? `./icons/${currentWeather.weatherIcon}.svg`
    : `./vite.svg`;
  return (
    <div className="current-weather">
      <img src={weatherIcon} className="weather-icon" />
      <h2 className="temperature">{temperature}</h2>
      <p className="description">{currentWeather.description}</p>
    </div>
  );
};
