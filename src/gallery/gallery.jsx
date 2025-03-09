import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  const [drawings, setDrawings] = useState([]);
  
  useEffect(()=>{
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/drawings-gallery', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok){
          const data = await response.json();
          setDrawings(data);
        } else {
          console.error('Failed to fetch gallery:', response.status);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGallery();
  }, []);


  
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
