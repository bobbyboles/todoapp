import React, { useEffect, useState } from "react";
import Login from "./Login";
import Todo from "./Todo";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const Main = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            console.log(token, " this is the token in use effect.");
            const findUserByToken = async (token) => {
                const { data } = await axios.get("/api/auth/me", {
                    headers: { authorization: token },
                });
                setUser(data);
                console.log("this is the data into set user", data);
            };
            findUserByToken(token)
        }
    }, []);

    return (
        <>
            <Routes>
                <Route path="/*" element={<Login />}></Route>
                <Route path="/todo" element={<Todo />}></Route>
            </Routes>
        </>
    );
};

export default Main;
