import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className="background-image">
    <div className="app-baseline-layout">
      <header className="header-spacing">
        {/* CapTrainimi */}
        <h1 className="home-title-text">CapTrainimi</h1>
        <div className = "font-awesome-icon">
          <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome'/>
        </div>
      </header>
      <body className="body-layout">
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-outline-primary btn-lg" aria-label='login-button'>Log in</button>
        <button type="button" className="btn btn-outline-primary btn-lg" aria-label='signup-button'>Signup with email</button>
      </div>
      </body>
    </div>
          <footer className="footer">
          <p>
            DC3010 Final Project Application
          </p>
        </footer>
    </div>
  );
}

export default Home;
