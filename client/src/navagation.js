import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="navbarr">
            <ul>
                <li>
                    {/* to={"/users"}> */}
                    <Link className="" to={"/donors"}>
                        Find Donors
                    </Link>{" "}
                </li>
                <li>
                    {/* to={"/users"}> */}
                    <Link className="" to={"/distribuitors"}>
                        Find Distribuitors
                    </Link>{" "}
                </li>
                <li>
                    <Link className="" to={"/friends"}>
                        Your Connections
                    </Link>
                </li>
                <li>
                    <Link className="" to={"/chat"}>
                        Chat
                    </Link>
                </li>
            </ul>
        </div>
    );
}
