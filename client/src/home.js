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
                        <h2 className="welcome"> </h2>
                        <h2 className="welcome"> </h2>
                        <h2 className="welcome3">Why Share Food?</h2>

                        <h2 className="welcome">Be a Donor </h2>
                        <p>
                            Due to the corona crisis a large part of the
                            population has lost its source of income. When we
                            talk about Brazil, half of the population, 105
                            million people, have nothing to eat.
                            <br></br>
                            <br></br>
                            That is why we created this App, we need to join
                            forces! If you have, you can donate ready-to-eat
                            meals or money to buy basic supplies
                            <br></br>
                            <button>
                                <Link to="/registration">
                                    <b>
                                        <span>Be a Donor</span>
                                    </b>
                                </Link>
                            </button>
                        </p>
                        <br></br>

                        <h2 className="welcome2">Distributor</h2>
                        <p>
                            If you do social work, are interested in the cause,
                            or work in a NGO ,are interested in ending hunger
                            for those around you
                            <br></br>
                            <button>
                                <Link to="/registration">
                                    <b>
                                        <span>Be a Distributor</span>
                                    </b>
                                </Link>
                            </button>
                        </p>
                    </div>
                    <div className="item-2 aside-image">
                        <img src="../Food-share-home.jpeg" />
                    </div>
                </div>
                <div className="grid">
                    {/* <div className="item-1 bottom-1">
                        <h2 className="welcome3">why donate?</h2>
                        <p>
                            O trecho padrão original de Lorem Ipsum, usado desde
                            o século XVI, está reproduzido abaixo para os
                            interessados. <br></br>Change your routine whenever
                            you want.
                        </p>
                    </div> */}
                    <div className="item-2 bottom-2 aside-image">
                        <img src="../Food-share-home02.jpeg" />
                    </div>
                </div>
            </div>
        </>
    );
}