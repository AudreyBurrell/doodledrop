import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <main>
      <div>
        <form>
          <div>
            <span>Username: </span>
            <input type="text" placeholder="username here" required />
          </div>
          <br />
          <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/draw')}>
            Login &rarr;
          </button>
          <button type="button" className="btn btn-outline-success" onClick={() => navigate('/draw')}>
            Register &rarr;
          </button>
        </form>
        <br />
      </div>
    </main>
  );
}


