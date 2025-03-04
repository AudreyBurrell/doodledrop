import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Gallery } from './gallery/gallery';
import { Draw } from './draw/draw';
import { Share } from './share/share';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define the onLogin function that updates the loggedIn state
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <div className='body'>
        <header>
          <h1>DoodleDrop</h1>
          <nav>
            <menu>
              <li><NavLink to="/" disabled={isLoggedIn}>Home</NavLink></li>
              <li><NavLink to="draw" disabled={!isLoggedIn}>Draw</NavLink></li>
              <li><NavLink to="gallery" disabled={!isLoggedIn}>Gallery</NavLink></li>
              <li><NavLink to="share" disabled={!isLoggedIn}>Share</NavLink></li>
            </menu>
          </nav>
          <br />
        </header>

        <Routes>
          {/* Pass the handleLogin function as a prop to Login */}
          <Route 
            path="/" 
            element={<Login onLogin={handleLogin} />} 
            exact 
          />
          {/* If not logged in, redirect to Login */}
          <Route path="/draw" element={isLoggedIn ? <Draw /> : <Login />} />
          <Route path="/gallery" element={isLoggedIn ? <Gallery /> : <Login />} />
          <Route path="/share" element={isLoggedIn ? <Share /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <a href="https://github.com/AudreyBurrell/doodledrop">Audrey Burrell's GitHub</a>
          
          {isLoggedIn && (
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          )}
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}


