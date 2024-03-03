import './BasicStyles.css';
import './Signup.css';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from './UserAuthContext';
import { useFirebase } from './FirebaseProvider';

function Signup() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    let signUp: any = {};
    signUp = useUserAuth().signUp;
    let navigate = useNavigate();
    let errorElement;


    const { createUser } = useFirebase();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            saveUserData();
            navigate("/login");
        } catch (err) {
            setError(JSON.stringify(err));
        }
    }

    if (error) {
        if (error.includes("auth/missing-email") || error.includes("auth/invalid-email")) {
            errorElement = <p className="fs-4 text-danger">An invalid email has been used, please try again</p>
        } else if (error.includes("auth/missing-password") || error.includes("auth/weak-password")) {
            errorElement = <p className="fs-4 text-danger">Please enter a secure password (at least 6 characters long)</p>
        } else {
            errorElement = <p className="fs-4 text-danger">An unexpected error has occured, please try again later</p>
        }

    }

    async function saveUserData() {
        await createUser({
            email: email,
            role: "1",
            trainingCourseIds: []
        });
    }

    return (
        <>
            <div className="app-baseline-layout">
                <header className="header">
                    <div className="font-awesome-icon">
                        <FontAwesomeIcon icon={faFilePen} aria-label='font-awesome' />
                    </div>
                    <h1>Please fill out your details to create an account</h1>
                </header>
                <div className="w-25">
                    <h2>Email Address:</h2>
                    <h4 className="subtitle">The email address you will login with</h4>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder='e.g. EmailHandle@provider.com' aria-label='email' onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <h2>Password:</h2>
                    <h4 className="subtitle">The password for your account</h4>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" aria-label='password' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <p className="fs-6 text-black">(Minimum 6 characters long)</p>
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-primary btn-lg" aria-label='signup-button' onClick={handleSubmit}>Sign up!</button>
                    </div>
                </div>
                {errorElement}
                <h4>
                    Already have an account? <Link to="/login">Log In</Link>
                </h4>
            </div>
            <Footer />
        </>
    )
}

export default Signup;