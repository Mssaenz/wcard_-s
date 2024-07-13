import React, { useState } from 'react';
import './WeatherCard.css'; 

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = 'ad3cd37c131666b138f4cf524eab02f6'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
      setError(null); 
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      setError('Error fetching the weather data. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div className="weather-card">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>
          <span role="img" aria-label="search">🔍</span>
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <img
            className="weather-icon-large"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <h2>{weather.name}</h2>
          <p className="temperature">{weather.main.temp} °c</p>
          
          <div className="details">
            <div className="detail">
              <div className="icon-with-text">
                <img className="icon" src="./images/humidityIcon.png" alt="Humidity" />
                <div>
                  <span>{weather.main.humidity}%</span>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
            <div className="detail">
              <div className="icon-with-text">
                <img className="icon" src="./images/windIcon.png" alt="Wind" />
                <div>
                  <span>{weather.wind.speed} m/s</span>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
