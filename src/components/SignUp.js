import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault()
        let addUser = {
            username: username,
            password: password,
            email: email,
        }
      }

    return(
        <div>
                <form id="add-user-form" onSubmit={handleSubmit}>
                <h3>Create Account: </h3>

                    <label htmlFor="username">User Name:</label>
                    <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">Create Account</button>
                </form>
      </div>
    )
}

export default SignUp
