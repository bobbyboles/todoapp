import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import axios from "axios";


const AuthForm = () => {

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        console.log( username, password )
        const { data } = await axios.post('/api/auth/login', { username, password })
        window.localStorage.setItem('token', data.token)




    };

    return (
        <div>
            <form id="loginForm" onSubmit={handleSubmit} name='login'>
                <div>
                    <label htmlFor="username">
                        <small>Username</small>
                    </label>
                    <input name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <SignUp/>
        </div>
    );
};

export default AuthForm;
