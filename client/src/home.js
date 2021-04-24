import { Link } from "react-router-dom";
//import Logo from "./logo";

export default function Home() {
    return (
        <>
            {/* <header>
                <Link to="/">
                    <Logo />
                </Link>
                <h1 className="nav">Food Share</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/registration">
                                <p>Sign Up</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                <p>Login</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header> */}
            <div className="home-page">
                <div className="grid">
                    <div className="item-1">
                        <h2 className="welcome">Donate</h2>
                        <p>
                            O trecho padrão original de Lorem Ipsum, usado desde
                            o século XVI, está reproduzido abaixo para os
                            interessados. Seções 1.10.32 e 1.10.33 de de
                            <br></br>
                            <br></br>
                            <Link to="/registration">
                                <span>Be a Donor</span>
                            </Link>
                        </p>
                        <h2 className="welcome2">Distributor</h2>
                        <p>
                            O trecho padrão original de Lorem Ipsum, usado desde
                            o século XVI, está reproduzido abaixo para os
                            interessados.
                            <br></br>
                            <br></br>
                            <Link to="/registration">
                                <span>Be a Distributor</span>
                            </Link>
                        </p>
                    </div>
                    {/* <div className="item-2 aside-image">
                        <img src="../home1.png" />
                    </div> */}
                </div>
                <div className="grid">
                    <div className="item-1 bottom-1">
                        <h2 className="welcome3">why donate?</h2>
                        <p>
                            O trecho padrão original de Lorem Ipsum, usado desde
                            o século XVI, está reproduzido abaixo para os
                            interessados. <br></br>Change your routine whenever
                            you want.<br></br>
                            <br></br>
                        </p>
                    </div>
                    {/* <div className="item-2 bottom-2 aside-image">
                        <img src="../home2.png" />
                    </div> */}
                </div>
            </div>
        </>
    );
}