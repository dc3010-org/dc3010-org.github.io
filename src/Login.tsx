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

    let errorElement;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(JSON.stringify(error));
        }
    }
    if (error) {
        if (error.includes("auth/invalid-email")) {
            errorElement = <p className="fs-4 text-danger">An invalid email has been entered</p>
        } else if (error.includes("auth/missing-password") || error.includes("auth/invalid-credential")) {
            errorElement = <p className="fs-4 text-danger">The password entered does not match with this account</p>
        } else {
            errorElement = <p className="fs-4 text-danger">An unexpected error has occured, please try again later</p>
        }
    }

    return (
        <div>
            <div className="app-baseline-layout">
                <header className="header">
                    <div className="font-awesome-icon">
                        <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome' />
                    </div>
                    <h1 aria-label='login-label'>Login Below!</h1>
                </header>
                <div className="w-25">
                    <h2 aria-label='email-label'>Email</h2>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder='e.g. EmailHandle@provider.com' aria-label='email-input' onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <h2 aria-label='password-label'>Password</h2>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" aria-label='password-input' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-primary btn-lg" aria-label='login-button' onClick={handleSubmit}>Log In!</button>
                    </div>
                </div>
                {errorElement}
                <h4 aria-label='login-link-label'>
                    Haven't got an account? <Link to="/signup">Sign up!</Link>
                </h4>
            </div>
            <Footer />
        </div>
    )
}

export default Login;