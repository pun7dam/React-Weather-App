export const SearchSection = ({ getWeatherDetails }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const handleCitySearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(".search-input");
    console.log(API_KEY);

    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}`;
    console.log(API_URL);
    getWeatherDetails(API_URL);
  };
  return (
    <div className="search-section" onSubmit={handleCitySearch}>
      <form action="#" className="search-form">
        <span className="material-symbols-rounded">search</span>
        <input
          type="search"
          placeholder="Enter a city name"
          required
          className="search-input"
        />
      </form>
      {/* Put a button here  */}
      <button className="location-button">
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};
