import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  }

  const handleSubmit = () => {
    if (username.trim() === '') {
      return;
    }
    navigate('/draw')
  }

  return (
    <main>
      <div>
        <form onSubmit = {(e) => e.preventDefault()}>
          <div>
            <span>Username: </span>
            <input
              type = "text"
              placeholder = "username here"
              value={username}
              onChange={handleInputChange}
              required>
            </input>
          </div>
          <br />
          <button //login button
            type="button"
            className = "btn btn-outline-primary"
            onClick={handleSubmit}
            disabled={!username.trim()}
          >
            Login &rarr;
          </button>
          <button //register button
            type="button"
            className="btn btn-outline-success"
            onClick={handleSubmit}
            disabled={!username.trim()}>
              Register &rarr;
          </button>
        </form>
      </div>
    </main>
  );
}


