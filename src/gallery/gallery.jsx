import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    setImages(savedImages);
  }, []);
  const saveImage = (newImage) => {
    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
  }

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
