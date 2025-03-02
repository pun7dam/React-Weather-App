# Weather App

This project is a weather application that allows users to search for weather details of any city and view the current weather as well as hourly forecasts. The application leverages the WeatherAPI to fetch weather data and displays it in a user-friendly interface.

## Features

- **City Weather Search:** Users can enter a city name to get the current weather and hourly forecast for that location.
- **Location Button:** A button to quickly access weather details for the user's current location.
- **Current Weather:** Displays the current weather conditions including temperature, humidity, and more.
- **Hourly Forecast:** Provides an hourly weather forecast with key details.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **WeatherAPI:** A weather data provider API.
- **CSS:** Styling for the application's interface.
- **Material Symbols:** Icons used in the application.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/pun7dam/weather-app.git
    cd weather-app
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your WeatherAPI key:

    ```env
    VITE_API_KEY=your_weather_api_key
    ```

### Running the Application

Start the development server:

```sh
npm run dev
```

Open your browser and visit `http://localhost:3000` to view the application.
