import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = async () => {
    if (username.trim() === '') {
      return;
    }
    if (typeof onLogin === 'function') {
      onLogin(username);
    } else {
      console.error('onLogin is not a function');
    }
    localStorage.setItem('username', username);
    navigate('/draw');
  };
  const handleRegister = async () => {
    handleLogin();
  }

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
            onClick={handleRegister} 
            disabled={!username.trim()}
          >
            Register &rarr;
          </button>
        </form>
      </div>
    </main>
  );
}

