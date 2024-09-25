import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import './Registration.css'; // Make sure to import your CSS file

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registered successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page-container"> {/* This div centers the content */}
            <div className="registration-container">
                <h2>Register</h2>
                <form className="registration-form" onSubmit={handleRegistration}>
                    <input
                        className="input-field"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="submit-button" type="submit">Register</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Registration;
