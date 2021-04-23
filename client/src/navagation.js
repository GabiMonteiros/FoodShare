import { Link } from "react-router-dom";
// import { IoBookmarkOutline, IoChatboxOutline } from "react-icons/io5";

export default function Navigation() {
    return (
        <header>
            <Link to="/home#/">
                <Logo />
            </Link>
            <h1 className="nav">Food Share</h1>
            <nav>
                <ul>
                    <li>
                        {/* to={"/users"}> */}
                        <Link className="" to={"/findonors"}>
                            FindDonors
                        </Link>{" "}
                    </li>
                    <li>
                        {/* to={"/users"}> */}
                        <Link className="" to={"/finddistributor"}>
                            FindDistribuitors
                        </Link>{" "}
                    </li>
                    <li>
                        <Link className="" to={"/connections"}>
                            Connections
                        </Link>
                    </li>
                    <li>
                        <Link to="/chat">
                            <IoChatboxOutline className="icon" />
                        </Link>
                    </li>
                    <li>
                        {/* <Link className="" to={"/logout"}>
                            Logout
                        </Link> */}
                    </li>
                    <li>
                        <Link to="/">
                            <ProfilePic profile_pic={this.state.profile_pic} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
