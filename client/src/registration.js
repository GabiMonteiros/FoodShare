//import Logo from "./logo";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

//fazer uma route bio para donor
//fazer uma route bio para distributor

//oi@exemplo.com


export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            sucess: null,
            error: false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state);
    }

    handleClick(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        if (
            !this.state.first ||
            !this.state.last ||
            !this.state.email ||
            !this.state.password ||
            !this.state.adress ||
            !this.state.active
        ) {
            return this.setState({
                error: "Please fill out the form",
            });
        }    
        axios
            .post("/home/registration", this.state) //mesma route aqui e no server
            .then(({ data }) => {
                console.log("response to post register", data);
                if (data.userId) {
                    // redirecting the user to '/' route
                    location.replace("/");
                } else {
                    // conditionally render an error message - this means something went wrong
                    this.setState({
                        error: data.error,
                    });
                }
            })
            .catch((err) => console.log("err in post /registration: ", err));
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
                        onChange={(e) => this.handleChange(e)}
                        className="adress"
                        name="adress"
                        placeholder="Location"
                        type="text"
                        required
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        className="active"
                        name="active"
                        placeholder="Donor or Distributor"
                        type="text"
                        required
                    />

                    <button
                        className="sig-up"
                        onClick={(e) => this.handleClick(e)}
                    >
                        Sign Up
                    </button>
                    <p>If you are already a member</p>
                    <Link to="/login">
                        <button className="log-in">Log In</button>
                    </Link>
                </div>
            </div>
        );
    }
}