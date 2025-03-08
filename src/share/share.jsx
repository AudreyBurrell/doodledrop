import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './share.css';

export function Share() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  useEffect(() => {
    const savedImage = localStorage.getItem('sharedImage');
    if (savedImage) {
      setImageSrc(savedImage); // Set state with the image
    } else {
      console.warn('No image found in local storage'); // Debugging log
    }
  }, []);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage('Image successfully sent!');
    setEmail(''); //clear email input after sending
    setTimeout(() => setSuccessMessage(''), 3000); //hide message after three seconds
  }


  return (
    <main>
      <div>
        <form id="sendForm" onSubmit={handleSubmit}>
          <label htmlFor="recipientEmail">Enter recipient's email: </label>
          <input type="email" id="recipientEmail" name="recipientEmail" placeholder="Enter email" required value={email} onChange={handleInputChange} />
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div id="imageToSend">
            {imageSrc ? (
              <img src={imageSrc} alt="Shared Drawing" width="200" />
            ) : (
              <p>No image available</p>
            )}
          </div>
          
          <button type="submit" className="btn btn-outline-success" disabled={!email.trim()}>
            <b>Send</b>
          </button>
          
          <br /><br />
          
          <button 
            type="button" 
            className="btn btn-outline-primary" 
            id="backButton" 
            onClick={() => navigate('/draw')}
          >
            <b>&larr; Back to Drawing</b>
          </button>

        </form>
      </div>
    </main>
  );
}
