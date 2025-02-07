import React from 'react';
import { useNavigate } from 'react-router-dom';
import './draw.css';

export function Draw() {
  const navigate = useNavigate();

  return (
    <main>
      <div>
        <canvas
          id="drawCanvas"
          width="400"
          height="400"
          className="container-fluid"
          style={{ border: '1px solid black' }}
        ></canvas>
        <br />
        <div id="controls">
          <label htmlFor="colors">Color:</label>
          <select id="colors">
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
          </select>
          <label htmlFor="size">Size:</label>
          <select id="size">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div id="buttons">
          <button type="button" className="btn btn-outline-danger">
            <b>Clear</b>
          </button>
          <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/gallery')}>
            Gallery
          </button>
          <button type="button" className="btn btn-outline-success" onClick={() => navigate('/share')}>
            Share
          </button>
        </div>
      </div>
    </main>
  );
}
