//login magali

<div className="formField">
    <div className="header">
        <h2>Login</h2>
        <p>Enter with your email and password</p>
        {this.state.error && (
            <p className="errorMessage">
                Something went wrong. Please try again
            </p>
        )}
    </div>
    <div className="form">
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

        <button onClick={(e) => this.handleClick(e)}>Enter</button>
    </div>
    <Link to="/registration">
        <button className="sig-up submits">Sign Up</button>
    </Link>
    <Link to="/reset-password">
        <button className="frgt-pass submits">New Password?</button>
    </Link>
</div>;
