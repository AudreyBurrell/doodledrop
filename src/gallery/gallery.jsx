import React from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="gallery-grid">
        <div className="item">
          <img src="placeholder1.png" alt="placeholder" width="100" />
        </div>
        <div className="item">
          <img src="placeholder2.png" alt="placeholder" width="100" />
        </div>
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
