import React, {useState} from 'react';
import {useAuth} from "../context/AuthContext.jsx";

const RegisterForm = ({ setView }) => {

    const { handleRegister } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister({ name, password_confirmation: passwordConfirmation, email, password });
        setName("");
        setEmail("");
        setPasswordConfirmation("");
        setPassword("");
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3>Create account</h3>
                <label htmlFor="email">Name:</label>
                <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password-confirmation">Confirm Password:</label>
                <input name="password-confirmation" type="password" value={passwordConfirmation}
                       onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                <button type="submit">Sign in</button>
                <p>Have an account? <a href="#" onClick={setView}>Sign in</a></p>
            </form>
        </div>
    )
}

export default RegisterForm;
