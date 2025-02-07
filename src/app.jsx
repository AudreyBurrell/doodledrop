import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Gallery } from './gallery/gallery';
import { Draw } from './draw/draw';
import { Share } from './share/share';

export default function App() {
    return (
        <BrowserRouter>
        <div className='body'>
            <header>
            <nav>
                <menu>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="draw">Draw</NavLink></li>
                    <li><NavLink to="gallery">Gallery</NavLink></li>
                    <li><NavLink to="share">Share</NavLink></li>
                </menu>
            </nav>
            <br />
            </header>
            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/draw' element={<Draw />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/share' element={<Share />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        <footer>
            <a href="https://github.com/AudreyBurrell/startup">Audrey Burrell's GitHub</a>
        </footer>  
      </div>
      </BrowserRouter> 
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }