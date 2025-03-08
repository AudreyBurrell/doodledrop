import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState('');
  

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  useEffect(() => {
    if (username) {
      fetchDrawings(username);
    }
  }, [username]);
  const fetchDrawings = async (username) => {
    try {
      const response = await fetch(`/api/api/drawings?username=${username}`);
      if (response.ok) {
        const drawings = await response.json();
        const images = drawings.map(drawing => drawing.drawingData);
        setImages(images);
      } else {
        console.error('Error fetching drawings');
      }
    } catch (error) {
      console.error('Error fetching drawings:', error);
    } 
  };

  return (
    <main>
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div className="item" key={index}>
              <img src={image} alt={`Drawing ${index + 1}`} width="100" />
            </div>
          ))
        ) : (
          <p>No images in gallery.</p>
        )}
      </div>
      <button 
        type="button" 
        id="backButton" 
        className="btn btn-outline-primary" 
        onClick={() => navigate('/draw')}>
        &larr;
      </button>
    </main>
  );
}
