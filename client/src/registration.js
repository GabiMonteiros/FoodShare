//import Logo from "./logo";
import { Component } from "react";
import axios from "./axios"
//import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            errors: false,
        };
    }

    componentDidMount() {
        console.log("mounted the registration page");
    }

    handleClick(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        if (
            !this.state.first ||
            !this.state.last ||
            !this.state.email ||
            !this.state.password
        ) {
            
            console.log("posting");
            axios
                .post("/home/register", this.state)
                .then(({ data }) => {
                    console.log("response to post register", data);
                    location.replace("/");
                })
                .catch((err) => console.log("err in handleClick", err));
        } else {
            this.setState({ errors: true });
        }
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
                
            }
            
        );
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Food share Plataform</h1>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    placeholder="First Name"
                    type="text"
                    required
                />

                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    placeholder="Last Name"
                    type="text"
                    required
                />

                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="Email"
                    type="text"
                    required
                />

                <input
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                />

                <button
                    className="sig-up"
                    onClick={(e) => this.handleClick(e)}
                >
                    Sign Up
                </button>
            </div>
        );
    }
}
