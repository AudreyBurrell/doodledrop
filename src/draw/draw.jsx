import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './draw.css';

export function Draw() {
  const navigate = useNavigate();

  const [color, setColor] = useState('black'); //default is black
  const [brushSize, setBrushSize] = useState(5); //default brush size
  const [isDrawing, setIsDrawing] = useState(false); //tracking if user is drawing
  const [lastX, setLastX] = useState(0); //last mouse x position
  const [lastY, setLastY] = useState(0);
  const canvasRef = useRef(null);

  //update canvas when color changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
  }, [color, brushSize]);
  //handle color change in the dropdown
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  //handle brush size change
  const handleSizeChange = (e) => {
    const size = e.target.value === 'small' ? 5 : e.target.value === 'medium' ? 10 : 15;
    setBrushSize(size);
  }
  //get mouse position relative to the canvas
  const getMousePosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect(); //get canvas position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x,y };
  }
  //handle mouse down (start drawing)
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { x,y } = getMousePosition(e);
    setLastX(x); //get current mouse x position
    setLastY(y);
  }
  //handle mouse moving
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setLastX(offsetX);
    setLastY(offsetY);
  }
  //mouse up (stop drawing)
  const handleMouseUp = () => {
    setIsDrawing(false);
  }
  //what if the mouse leaves the canvas?
  const handleMouseOut = () => {
    setIsDrawing(false);
  }
  //handle clear button
  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height); //clear the canvas
  }

  return (
    <main>
      <div>
        <canvas
          ref = {canvasRef}
          width = "400"
          hegiht = "400"
          className = "container-fluid"
          style={{ border: '1px solid black' }}
          onMouseDown = {handleMouseDown}
          onMouseMove = {handleMouseMove}
          onMouseUp = {handleMouseUp}
          onMouseOut = {handleMouseOut}>
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
          <select id="size" value={brushSize === 5 ? 'small' : brushSize === 10 ? 'medium' : 'large'} onChange={handleSizeChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
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
  )
}



