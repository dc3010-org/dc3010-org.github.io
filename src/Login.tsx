import './BasicStyles.css';
import './Login.css';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let logIn: any = {};
    logIn = useUserAuth().logIn;
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(error as string);
        }
    }

    return (
        <div>
            <div className="app-baseline-layout">
                <header className="header">
                    <div className="font-awesome-icon">
                        <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome' />
                    </div>
                    <h1>Login Below!</h1>
                </header>
                <div>
                    <h2>Email</h2>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder='e.g. EmailHandle@provider.com' aria-label='email' onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <h2>Password</h2>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" aria-label='password' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-primary btn-lg" aria-label='signup-button' onClick={handleSubmit}>Log In!</button>
                    </div>
                    <h4>
                        Haven't got an account? <Link to="/signup">Sign up!</Link>
                    </h4>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;