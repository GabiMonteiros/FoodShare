
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    // console.log(users, "this is my array of users");
    const [searchusers, setSearchUsers] = useState();
    console.log(searchusers, "this is mu searchusers");

    const handleChange = (e) => {
        console.log("e.target.value", e.target.value);
        setSearchUsers(e.target.value);
    };
    useEffect(() => {
        if (!searchusers) {
            axios.get("/lastthreeusers").then((res) => {
                console.log("component mounted");
                console.log(
                    "this is my response data after the app component mounted, it contains the user information from GET /user route",
                    res.data
                );
                console.log("this is my data", res.data);

                setUsers(res.data);
                console.log("hi i am your users", users);
            });
        } else {
            axios.get(`/users/${searchusers}`).then((res) => {
                console.log("component mounted");

                console.log("this is my data", res.data);

                setUsers(res.data);
                console.log("hi i am your users", users);
            });
        }
    }, [searchusers]);

    return (
        <div className="findPeople">
            <br></br>
            <p>Find Connections</p>
            <br></br> <br></br>
            <h3>Find Connections</h3>
            <p>Are you looking for a new partner to fight hunger? </p>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="search for a new connection"
                    className="searchInput"
                    onChange={handleChange}
                />
            </div>
            {users.map((user) => (
                <div className="users" key={user.id}>
                    <Link to={"/user/" + user.id} className="searchedUsers">
                        <div className="">
                            <img
                                className="profile-img-other"
                                src={
                                    user.profile_pic || "../default-img-svg.png"
                                }
                            />
                        </div>
                    </Link>
                    <div className="users-bio">
                        <p>
                            <b>
                                {user.first} {user.last} <br></br>
                                {user.adress}, {user.active}
                            </b>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}


