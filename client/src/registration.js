import Logo from "./logo";
import { Component } from "react";
import axios from "./axios"
// import { Link } from "react-router-dom";

//fazer uma route bio para donor
//fazer uma route bio para distributor



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
            !this.state.password ||
            !this.state.status
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
            <div className="formField">
                <div className="form">
                    <div className="header">
                        <h2>Registration</h2>
                        <p>Your journey starts here! Set up your profile.</p>
                        {this.state.error && (
                            <p>
                                <span className="errorMessage">
                                    Something went wrong. Please try again
                                </span>
                            </p>
                        )}
                    </div>
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
                    <input
                        className="statusDonor"
                        name="status"
                        placeholder="Donor"
                        type="text"
                    />

                    <button
                        className="sig-up"
                        onClick={(e) => this.handleClick(e)}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }
}