
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
  //handle canvas resizing
  useEffect(() => {
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  return () => window.removeEventListener('resize', resizeCanvas);
}, []);
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
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  return { x,y };
};
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
  const { x,y } = getMousePosition(e)
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y)
  ctx.stroke();
  setLastX(x);
  setLastY(y);
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
//sharing
const handleShare = () => {
  const canvas = canvasRef.current;
  if (canvas) {
    const dataURL = canvas.toDataURL('image/png'); // Convert canvas to image URL
    console.log("Saving image to localStorage:", dataURL); // Debugging log
    localStorage.setItem('sharedImage', dataURL); // Save to local storage
    navigate('/share'); // Navigate to Share page
  } else {
    console.error('Canvas not found');
  }
};
//saving to put in gallery
const handleSaveToGallery = async () => {
  const canvas = canvasRef.current;
  const dataURL = canvas.toDataURL('image/png');
  let images = JSON.parse(localStorage.getItem('galleryImages'))
  images.push(dataURL);
  localStorage.setItem('gallerImages', JSON.stringify(images));
  
  setTimeout(() => {
    navigate('/gallery');
  }, 100)

};


return (
<main>
  <div>
    <canvas
      ref = {canvasRef}
      className = "container-fluid"
      style={{ border: '1px solid black', width:'100%', height:'500px' }}
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
    <button type="button" className="btn btn-outline-primary" onClick={handleSaveToGallery}>
    Gallery
    </button>
    <button type="button" className="btn btn-outline-success" onClick={handleShare}>
    Share
    </button>
  </div>
</div>
</main>
)
}



