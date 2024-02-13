import './BasicStyles.css';
import './Login.css';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <div className="app-baseline-layout">
                <header className="header">
                    <div className="font-awesome-icon">
                        <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome' />
                    </div>
                    <h1>Login Below!</h1>
                </header>
                <body>
                    <form action="">
                        <h2>Username</h2>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder='e.g. User123' aria-label='username'></input>
                        </div>
                        <h2>Password</h2>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" aria-label='password'></input>
                        </div>
                        <div className="input-group mb-3">
                            <Link to="/dashboard">
                                <input type="submit" value="Submit"></input>
                            </Link>
                        </div>
                    </form>

                </body>
            </div>
            <Footer />
        </div>
    )
}

export default Login;