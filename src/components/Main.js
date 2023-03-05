import React from "react";
import Login from "./Login";
import Todo from "./Todo";
import { Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<Login/>}></Route>
                <Route path="/todo" element={<Todo/>}></Route>
            </Routes>
        </>
    );
};

export default Main;
