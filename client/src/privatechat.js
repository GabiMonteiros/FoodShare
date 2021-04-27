import  { useRef, useEffect } from "react"; //React,
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function PrivateChat(props) {
    const elemRef = useRef();
    const privateChatMessages = useSelector(
        (state) => state && state.privateChatMessages
    );

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [privateChatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("addNewPrivateMessage", {
                message: e.target.value,
                receiverId: props.otherUserId,
            });
            e.target.value = "";
        }
    };

    return (
        <div className="private-chat">
            <h2>Private Chat</h2>
            <div className="chat-messages-container" ref={elemRef}>
                {privateChatMessages &&
                    privateChatMessages.map((msg, id) => {
                        if (
                            msg.sender_id != props.otherUserId &&
                            msg.receiver_id != props.otherUserId
                        ) {
                            return null;
                        }
                        return (
                            <div key={id}>
                                <div>
                                    <span className="chat-message-name">
                                        {msg.first} {msg.last}
                                    </span>
                                    <div className="chat-message-box">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <textarea
                name="message"
                rows="2"
                placeholder="Write message..."
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}