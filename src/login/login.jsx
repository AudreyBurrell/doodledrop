import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  // //const [ws, setWs] = useState(null);
  // const [socket, setSocket] = useState(null);

  const socketRef = useRef(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://localhost:4000`);
    console.log('Connecting to websocket server at:', window.location.host);
  
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // Send a message to the server once the connection is open
      socket.send(JSON.stringify({ type: 'login', username: username }));
    };
  
    socket.onmessage = (event) => {
      console.log('Received message from websocket server:', event.data);
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        setActiveUsers(data);
      }
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    socketRef.current = socket;
  
    // Check WebSocket connection status
    const checkWebSocketStatus = () => {
      if (socket.readyState === WebSocket.OPEN) {
        console.log('WebSocket is connected');
      } else {
        console.log('WebSocket is not connected');
      }
    };
  
    setInterval(checkWebSocketStatus, 1000); // Check every second
  
    return () => {
      socket.close();
    };
  }, []);

  // useEffect(() => {
  //   const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  //   const socket = new WebSocket(`${protocol}://${window.location.host}`);
  //   console.log('Connecting to websocket server at:', window.location.host);
  //   socket.onmessage = (event) => {
  //     console.log('Received message from websocket server:', event.data);
  //     const data = JSON.parse(event.data);
  //     if (Array.isArray(data)){
  //       setActiveUsers(data);
  //     }
  //   }
  //   socket.onopen = () => console.log('Websocket connected established');
  //   socket.onclose = () => console.log('Websocket connection closed');
  //   socket.onerror = (error) => console.error('WebSocket error:', error);

  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   }
  // }, []);
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
    if (username.trim() === ''){
      return;
    }
    try {
      const response = await fetch('/api/auth/login', {
        method:'POST',
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify({ username }),
        credentials: 'include',
      });
      if (!response.ok){
        throw new Error('Login failed');
      }
      const data = await response.json();
      if (data.username) {
        localStorage.setItem('username', data.username);
        onLogin(data.username);
        navigate('/draw');
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
    
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

        <div className="active-users">
          <h2>Currently Active Users:</h2>
          {activeUsers.length === 0 ? (
            <p>No one is currently using DoodleDrop.</p>
          ) : (
            <ul>
              {activeUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          )}
        </div>

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
