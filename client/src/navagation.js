import { Link } from "react-router-dom";
import Logo from "./logo";
//import { IoBookmarkOutline, IoChatboxOutline } from "react-icons/io5";

export default function Navigation() {
    return (
        <header>
            <Link to="/">
                <Logo />
            </Link>
            <h1 className="nav">Food Share</h1>
            <nav>
                <ul>
                    
                    
                    <li>
                        {/* to={"/users"}> */}
                        <Link className="" to={"/users"}>
                            New Parthers
                        </Link>{" "}
                    </li>

                    <li>
                        <Link className="" to={"/connections"}>
                            Connections
                        </Link>
                    </li>

                    <li>
                        <Link to="/chat">
                            Chat
                        </Link>
                    </li>
                    {/* <li>
                        <Link className="" to={"/logout"}>
                            Logout
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link to="/profile">

                            <ProfilePic
                                toggleUploader={props.toggleUploader}
                                profile_pic={props.profile_pic}
                            />
                        </Link>
                    </li>  */}
                </ul>
            </nav>
        </header>
    );
}
