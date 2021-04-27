import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Onlineusers from "./onlineUsers";
import { Link } from "react-router-dom";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.messages);

    useEffect(() => {
        // console.log("elemReft is", elemRef);
        // console.log("scroll top", elemRef.current.scrollTop);
        // console.log("clientHeight", elemRef.current.clientHeight);
        // console.log("scrollHeight", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        // console.log("value: ", e.key);

        if (e.key === "Enter") {
            // console.log("value: ", e.key);
            e.preventDefault();
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    console.log(chatMessages);

    return (
        <div>
            <Onlineusers />
            <h2>Welcome to chatroom</h2>

            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message) => {
                        return (
                            <div
                                // chatprofilemessage
                                className="message-container"
                                key={message.id}
                            >
                                <Link to={`/user/${message.sender_id}`}>
                                    <img
                                        //className="chatProfilePic" - diminuir o tamanho 
                                        className="profile-img"
                                        src={
                                            message.profile_pic ||
                                            "../default-img-svg.png"
                                        }
                                        alt={`${message.first} ${message.last}`}
                                    />
                                </Link>
                                <div className="chattext">
                                    <p>
                                        {message.first} {message.last} says:
                                    </p>
                                    {message.message}
                                    <span className="timestamp">
                                        {message["create_at"]}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {/* <textarea onKeyDown={handleKeyDown} /> - realocar a caixa de texto
                <FaArrowCircleUp
                    className="scrollTop" */}
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
