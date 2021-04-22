 import { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./home.js";
// import Logo from "./logo";
import Registration from "./registration.js";
// import Login from "./login.js";
// import ResetPassword from "./reset.js";
// import { Link } from "react-router-dom";






export default function Welcome() {
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 20) {
            document.querySelector("header").className = "scroll";
        } else {
            document.querySelector("header").className = "";
        }
    };

    return (
        <>
            <HashRouter>
                <>
                    <h1>welcome</h1>
                    <Route exact path="/" component={Home} />
                    <Route path="/registration" component={Registration} />
                </>
            </HashRouter>
        </>
    );
}