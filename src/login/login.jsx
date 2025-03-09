import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
      .then ((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Weather fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = async () => {
    if (username.trim() === '') {
      return;
    }
  
    if (typeof onLogin === 'function') {
      onLogin(username);  // Call onLogin with the username as before
    } else {
      console.error('onLogin is not a function');
    }
  
    localStorage.setItem('username', username);  // Save the username to localStorage
    navigate('/draw');  // Navigate to '/draw' after login
  };
  

  return (
    <main>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <span>Username: </span>
            <input
              type="text"
              placeholder="Username here"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleLogin}
            disabled={!username.trim()}
          >
            Login &rarr;
          </button>
        </form>
        <div className="weather-info">
          {loading && <p>Loading weather...</p>}
          {error && <p>Error fetching weather data: {error} </p>}
          {weatherData && weatherData.dataseries && weatherData.dataseries[0] && (
            <div>
              <h2>Current Weather</h2>
              <p>Temperature: {weatherData.dataseries[0].temp2m}</p>
              <p>Humidity: {weatherData.dataseries[0].rh2m}%</p>
              <p>Wind: {weatherData.dataseries[0].wind10m.direction} at {weatherData.dataseries[0].wind10m.speed}m/s</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
