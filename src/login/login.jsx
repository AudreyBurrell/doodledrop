import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = () => {
    if (username.trim() === '') {
      return;
    }
    localStorage.setItem('username', username);
    onLogin(username);
    navigate('/draw'); 
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
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleLogin} 
            disabled={!username.trim()}
          >
            Register &rarr;
          </button>
        </form>
      </div>
    </main>
  );
}

