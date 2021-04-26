import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };


    useEffect(() => {
        console.log(`Console log happening in useEffect`);
        let abort;

        (async () => {
            if (!query) {
                const { data } = await axios.get("/latest-users");
                if (!abort) {
                    setUsers(data);
                    console.log("data in find people", data);
                }
            } else {
                const { data } = await axios.get("/find-users/" + query);
                if (!abort) {
                    setUsers(data);
                    console.log("data in find people", data);
                }
            }
        })();

        return () => {
            console.log(`About to replace ${query} with`);
            abort = true;
        };
    }, [query]);

    

    return (
        <div className="findPeople">
            <h2>Find People</h2>
            {/* <p>Checkout who just joined!</p>
            <p>Are you looking for someone in particular? </p> */}
            <div className="search-box">
                <input
                    onChange={handleChange}
                    className="search-input"
                    name="search"
                />
            </div>
            <div>
                {users.map((users, idx) => (
                    <div key={idx} className="users">
                        <Link
                            to={"/user/" + users.id}
                            className="searchedUsers"
                        >
                            <div className="img-wrapper">
                                <img
                                    src={
                                        users.profile_pic ||
                                        "../default-img-svg.png"
                                    }
                                    alt={`${this.state.first} ${this.state.last}`}
                                    className="profile-img-other"
                                ></img>
                            </div>
                            <p>
                                <b>{users.first} {users.last}</b>
                            </p>
                        </Link>
                    </div>
                ))}
                {!users.length && query && <p>Nothing found</p>}
            </div>
        </div>
    );
}
