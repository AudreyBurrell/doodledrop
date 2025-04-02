import React, { useState, useEffect, useRef } from 'react'; //added useEffect and useRef
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'; 
import { Login } from './login/login';
import { Gallery } from './gallery/gallery';
import { Draw } from './draw/draw';
import { Share } from './share/share';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]); //adding this
  const socketRef = useRef(null); 
  useEffect(()=> {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://localhost:5173`) //change this to localhost:5143 when redoing code and npm run dev stuff
    console.log('Connecting to WebSocket server at:', window.location.host);
    socket.onopen = () => {
      console.log('WebSocket connection established!');
    };
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        //adding this if statement
        if (message.type === 'activeUsers') {
          setActiveUsers(message.users);
        }
      } catch(e) {
        console.error('Invalid JSON received:', event.data);
      }
    };
    socket.onerror = (error) => {
      console.error('Websocket error:', error);
    };
    socket.onclose = () => {
      console.log('Websocket connection closed');
    };
    socketRef.current = socket;
    return () => {
      socket.close();
    }; 
  }, []);

  // Define the onLogin function that updates the loggedIn state
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    console.log(`User ${username} logged in`);
    //adding this below
    // socketRef.current?.send(JSON.stringify({ type: 'login', username}));
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.sned(JSON.stringify({ type: 'login', username }));
    } else {
      socketRef.current?.addEventListener('open', () => {
        socketRef.current.send(JSON.stringify({ type: 'login', username }));
      }, {once: true});
    }
  };

  // Define the handleLogout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    //adding this below
    socketRef.current?.send(JSON.stringify({ type: 'logout' }));
  };
  

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
              {/* <li><NavLink to="share" disabled={!isLoggedIn}>Share</NavLink></li> */}
            </menu>
          </nav>
          <br />
        </header>

        <Routes>
          <Route 
            path="/" 
            element={<Login onLogin={handleLogin} />} 
            exact 
          />
          {/* If not logged in, redirect to Login */}
          <Route path="/draw" element={isLoggedIn ? <Draw /> : <Login onLogin={handleLogin} />} />
          <Route path="/gallery" element={isLoggedIn ? <Gallery /> : <Login onLogin={handleLogin} />} />
          {/* <Route path="/share" element={isLoggedIn ? <Share /> : <Login onLogin={handleLogin} />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          {/* Logout button */}
          {isLoggedIn && (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          )}
          <a href="https://github.com/AudreyBurrell/doodledrop">Audrey Burrell's GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}



