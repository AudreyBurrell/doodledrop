import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './share.css';

export function Share() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const savedImage = localStorage.getItem('sharedImage');
    if (savedImage) {
      setImageSrc(savedImage); // Set state with the image
    } else {
      console.warn('No image found in local storage'); // Debugging log
    }
  }, []);


  return (
    <main>
      <div>
        <form id="sendForm">
          <label htmlFor="recipientEmail">Enter recipient's email: </label>
          <input type="email" id="recipientEmail" name="recipientEmail" placeholder="Enter email" required />
          
          <div id="imageToSend">
            {imageSrc ? (
              <img src={imageSrc} alt="Shared Drawing" width="200" />
            ) : (
              <p>No image available</p>
            )}
          </div>
          
          <button type="submit" className="btn btn-outline-success">
            <b>Send</b>
          </button>
          
          <br /><br />
          
          <button 
            type="button" 
            className="btn btn-outline-primary" 
            id="backButton" 
            onClick={() => navigate('/draw')}
          >
            <b>&larr;</b>
          </button>
        </form>
      </div>
    </main>
  );
}
