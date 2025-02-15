import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login({ onLogin }) {  // Ensure onLogin is destructured here
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    if (username.trim() === '') {
      return;
    }

    onLogin(); // Call onLogin to mark the user as logged in
    navigate('/draw'); // Navigate to the draw page after login
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
            onClick={handleSubmit}
            disabled={!username.trim()}
          >
            Login &rarr;
          </button>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleSubmit}
            disabled={!username.trim()}
          >
            Register &rarr;
          </button>
        </form>
      </div>
    </main>
  );
}

