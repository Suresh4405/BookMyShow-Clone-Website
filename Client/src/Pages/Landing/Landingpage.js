// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./landing.css"
import shark from "../../assets/dance.mp4"

function LandingPage() {
  return (
    <div className="landing-page">
      <video className="bannerVideo" autoPlay muted loop>
          <source src={shark} type="video/mp4" /></video>
          <div className='boxed'>
      <h1 className='cdss'>Welcome to Steel The Show</h1>
      <p className='cds'>Please login or register to continue.</p>
      <div className="action-buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/register" className="button">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
