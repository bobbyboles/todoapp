import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

const AuthForm = () => {

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;



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
