import React, {useState} from 'react';
import {useAuth} from "../context/AuthContext.jsx";

const LoginForm = ({ setView }) => {

    const { handleLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin({ email, password });
        // setEmail("");
        // setPassword("");
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label htmlFor="email">Email:</label>
                <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign in</button>
                <p>Don't have an account? <a href="#" onClick={() => setView('register')}>Create one now</a></p>
            </form>
        </div>
    )
}

export default LoginForm;
