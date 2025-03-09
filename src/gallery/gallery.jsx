import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  const [drawings, setDrawings] = useState([]);
  
  useEffect(() => {
    fetch('/api/drawings-gallery', {
      method:'GET',
      credentials: 'include',
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch gallery');
      }
    })
    .then((data) => {
      setDrawings(data);
    })
    .catch((error) => {
      console.error('Error fetching gallery:', error);
    });
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
        &larr; Back to Drawing
      </button>
    </main>
  );
}
