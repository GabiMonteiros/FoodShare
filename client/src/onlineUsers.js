import React, { useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector, useDispatch } from "react-redux";
import { onlineUsers } from "./actions";
import { Link } from "react-router-dom";

export default function Onlineusers() {
    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    return (
        <div className="friendslist">
            <h4>Users Online:</h4>
            {onlineUsers &&
                onlineUsers.map((useron, id) => (
                    <div className="outerprofile" key={id}>
                        <div className="innerimage">
                            <Link to={"/user/" + useron.id}>
                                <img id="profilepic" src={useron.profile_pic} />
                            </Link>
                        </div>
                        <span className="online-user ">
                            {useron.first} {useron.last}
                        </span>
                        
                    </div>
                ))}
        </div>
    );
}
