import React from "react";

export const HourlyWeatherItem = () => {
  return (
    <li className="weather-item">
      <p className="time">00:00</p>
      <img src="icons/clouds.svg" className="weather-icon" />
      <p className="temperature">20°</p>
    </li>
  );
};
