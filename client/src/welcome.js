import {   useEffect  } from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./home.js";
import Logo from "./logo";
import Registration from "./registration.js";
import Login from "./login.js";
import ResetPassword from "./reset.js";
import { Link } from "react-router-dom";






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
                    <header>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <Link to="/">
                            <h1 className="nav">Food Share</h1>
                        </Link>    
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/registration">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <Route exact path="/" component={Home} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </>
            </HashRouter>
        </>
    );
}