import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './draw.css';

export function Draw() {
  const navigate = useNavigate();
  const [color, setColor] = useState('black');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  
  useEffect(() => {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');

    // Set initial color for drawing
    ctx.strokeStyle = color;
    ctx.lineWidth = 5; // Set a default size for the brush

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      setLastX(e.offsetX);
      setLastY(e.offsetY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      setLastX(e.offsetX);
      setLastY(e.offsetY);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [color, isDrawing, lastX, lastY]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleClear = () => {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

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
          <select id="colors" value={color} onChange={handleColorChange}>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div id="buttons">
          <button type="button" className="btn btn-outline-danger" onClick={handleClear}>
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

