import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  const [drawings, setDrawings] = useState([]);
  
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const response = await fetch(`/api/gallery?username=${username}`);
      const images = await response.json();
      setDrawings(images);
    };
    fetchGalleryImages();
    // const galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    // setDrawings(galleryImages);
  }, [])


  
  return (
    <main>
      <div className="gallery-grid">
        {drawings.length > 0 ? (
          drawings.map((drawing, index) => (
            <div className="item" key={index}>
              <img src={drawing} alt={`Drawing ${index + 1}`} width="100" />
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
        &larr; Back to Draw
      </button>
    </main>
  );
}
