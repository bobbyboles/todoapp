import React from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./components";
import { BrowserRouter as Router } from "react-router-dom"; 

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <Router>
        <Main />
    </Router>
)
