// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Resume Enhancer</h1>
      <p>Enhance your resume to match your desired job description.</p>
      <Link to="/login">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
