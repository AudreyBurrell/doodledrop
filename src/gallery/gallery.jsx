import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  const [drawings, setDrawings] = useState([]);
  const [username, setUsername] = useState(null); //this is new

  useEffect(() => { //this entire useEffect is new
    const fetchUsername = async () => {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.username) {
        setUsername(data.username);
      }
    };
    fetchUsername();
  });
  // useEffect(() => {
  //   // const galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
  //   // setDrawings(galleryImages);
  // }, []);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const response = await fetch(`/api/auth/check`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.status === 200) {
        const user = await response.json();
        const { username } = user; // Get the username from the authenticated user
        const imagesResponse = await fetch(`/api/gallery?username=${username}`, {
          method: 'GET',
          credentials: 'include', // Make sure to include credentials here as well
        });
        const images = await imagesResponse.json();
        setDrawings(images); // Set the drawings fetched from the gallery
      } else {
        console.error('User is not authenticated');
        // Handle unauthenticated state (e.g., redirect to login or show a message)
      }
    };
  
    fetchGalleryImages(); // Call the function once when the component mounts
  }, []);  // Empty dependency array ensures this runs once when the component mounts
  


  //below, src={drawing}
  return (
    <main>
      <div className="gallery-grid">
        {drawings.length > 0 ? (
          drawings.map((drawing, index) => (
            <div className="item" key={index}>
              <img src={drawing.imageData} alt={`Drawing ${index + 1}`} width="100" /> 
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
