import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className="app-baseline-layout">
      <header className="header-spacing">
        <h1 className="home-title-text">CapTrainimi</h1>
        <div className = "font-awesome-icon">
          <FontAwesomeIcon icon={faFilePen}/>
        </div>
      </header>
      <body className="body-layout">
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-outline-primary btn-lg">Log in</button>
        <button type="button" className="btn btn-outline-primary btn-lg">Sign up with email</button>
      </div>
      </body>
    </div>
  );
}

export default Home;
