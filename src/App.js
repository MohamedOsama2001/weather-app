import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "0458a50cbd9742d295281749241707";
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      setError("");
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`
      );
      setWeather(response.data.current);
      setForecast(response.data.forecast.forecastday);
    } catch (err) {
      setError("City not found.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 className="mb-3">Dynamic Weather App</h1>
      <form onSubmit={handleSearch} className="mb-3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2>Current Weather in {city}</h2>
          <p>Temperature: {weather.temp_c}°C</p>
          <p>Condition: {weather.condition.text}</p>
          <img src={weather.condition.icon} alt="weather-icon" />
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind_kph} kph</p>
        </div>
      )}
      {forecast && (
        <div>
          <h2 className="mt-5">3-Day Forecast</h2>
          <div className="container">
            <div className="row">
              {forecast.map((day, index) => (
                <div className="col-4">
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <p>
                      <strong>Date:</strong> {day.date}
                    </p>
                    <p>
                      <strong>Temperature:</strong> {day.day.avgtemp_c}°C
                    </p>
                    <p>
                      <strong>Condition:</strong> {day.day.condition.text}
                    </p>
                    <img src={day.day.condition.icon} alt="forecast-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
