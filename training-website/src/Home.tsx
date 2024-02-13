import './Home.css';
import './BasicStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="background-image">
      <div className="app-baseline-layout">
        <header className="header-spacing">
          {/* Title of the application. CapTrainimi*/}
          <h1 className="home-title-text">Placeholder</h1>
          <div className="font-awesome-icon">
            <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome' />
          </div>
        </header>
        <body className="body-layout">
          <div className="d-grid gap-2">
            <Link to="/login">
              <button type="button" className="btn btn-outline-primary btn-lg" aria-label='login-button'>Log in</button>
            </Link>
            <Link to="/signup">
              <button type="button" className="btn btn-outline-primary btn-lg" aria-label='signup-button'>Signup with email</button>
            </Link>
          </div>
        </body>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
