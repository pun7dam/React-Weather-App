import React from "react";
import { weatherCodes } from "../constant";

export const HourlyWeatherItem = ({ objHour }) => {
  const dateTime = new Date(objHour.time);

  const formattedTime = (dateTime) => {
    const timeString = dateTime.toTimeString().split(" ")[0];
    const [hours, minutes] = timeString.split(":"); // Splitting the string to get hours and minutes
    return `${hours}:${minutes}`;
  };

  const weatherIcon = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(objHour.condition.code)
  );

  return (
    <li className="weather-item">
      <p className="time">{formattedTime(dateTime)}</p>
      <img src={`./icons/${weatherIcon}.svg`} className="weather-icon" />
      <p className="temperature">{objHour.temp_c} °C</p>
    </li>
  );
};
