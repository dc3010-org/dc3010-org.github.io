import './BasicStyles.css';
import './Signup.css';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div>
            <div className="app-baseline-layout">
                <header className="header">
                    <div className="font-awesome-icon">
                        <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome' />
                    </div>
                    <h1>Please fill out your details to create an account</h1>
                </header>
                <body>
                    <form action="">
                        <h2>Email Address:</h2>
                        <h4 className="subtitle">The email address you want associating with the account</h4>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder='EmailHandle@provider.com' aria-label='email'></input>
                        </div>
                        <h2>Username for site:</h2>
                        <h4 className="subtitle">The username that will be used to login to your account</h4>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder='User123' aria-label='username'></input>
                        </div>
                        <h2>Password:</h2>
                        <h4 className="subtitle">The password for your account</h4>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" aria-label='password'></input>
                        </div>
                        <div className="input-group mb-3">
                            <Link to="./login">
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

export default Signup;