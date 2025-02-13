import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './draw.css';

export function Draw() {
  const navigate = useNavigate();
  const [color, setColor] = useState('black'); //default is black
  const canvasRef = useRef(null);

  //update canvas when color changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
  }, [color]);
  //handle color change in the dropdown
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <main>
      <div>
        <canvas
          ref = {canvasRef}
          width = "400"
          hegiht = "400"
          className = "container-fluid"
          style={{ border: '1px solid black' }}>
        </canvas>
        <br />
        <div id="controls">
          <label htmlFor="colors">Color:</label>
          <select id="colors" value={color} onChange={handleColorChange}>
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
  )
}



