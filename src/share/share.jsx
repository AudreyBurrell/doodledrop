import React from 'react';
import { useNavigate } from 'react-router-dom';
import './share.css';

export function Share() {
  const navigate = useNavigate();

  return (
    <main>
      <div>
        <form id="sendForm">
          <label htmlFor="recipientEmail">Enter recipient's email: </label>
          <input type="email" id="recipientEmail" name="recipientEmail" placeholder="Enter email" required />
          
          <div id="imageToSend">
            <p>Image to send...</p>
            <img src="placeholder1.png" alt="placeholder" width="100" />
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
