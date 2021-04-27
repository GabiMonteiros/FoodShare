import { useEffect } from "react"; //useState, 
import { useDispatch, useSelector } from "react-redux";
import { getList, acceptFriend, unfriend } from "./actions";

export default function Friends(props) {
    const dispatch = useDispatch();
    const wannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((wannabe) => wannabe.accepted == false)
    );

    const friends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friend) => friend.accepted == true)
    );

    useEffect(() => {
        dispatch(getList());
    }, []);

    if (!friends && !wannabes) {
        return null;
    }

    function handleClick(id) {
        props.history.push(`/user/${id}`);
    }
    // VER O IMGS PROF ,  adress, active- ADD NO DB
    return (
        <>
            <div className="container-friends">
                <h1>Connections Request</h1>
                {/* {!wannabes && <p>Nothing here!</p>} */}
                {wannabes.length > 0 && (
                    <div className="sub-container">
                        {wannabes.map((wannabe) => (
                            <div className="card" key={wannabe.id}>
                                <img
                                    onClick={() => handleClick(wannabe.id)}
                                    src={
                                        wannabe["profile_pic"] ||
                                        "../default-img-svg.png"
                                    }
                                    alt={`${wannabe["first"]} ${wannabe["last"]}`}
                                />
                                <h2>
                                    {`${wannabe["first"]} ${wannabe["last"]}`}
                                    {`${wannabe["adress"]}, ${wannabe["active"]}`}
                                </h2>
                                <button
                                    className="friendship"
                                    onClick={() =>
                                        dispatch(acceptFriend(wannabe.id))
                                    }
                                >
                                    Accept friend
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* // || <p>Nothing here!</p> */}
            </div>
            <div className="container-friends">
                <h3>Your Connections</h3>
                {(friends.length > 0 && (
                    <div className="sub-container">
                        {friends.map((friend) => (
                            <div className="card" key={friend.id}>
                                <img
                                    onClick={() => handleClick(friend.id)}
                                    src={
                                        friend["profile_pic"] ||
                                        "../default-img-svg.png"
                                    }
                                    alt={`${friend["first"]}}`}
                                />
                                <h3>
                                    {`${friend["first"]}`} {`${friend["last"]}`}
                                </h3>
                                <p>
                                    {" "}
                                    <b>
                                        {`${friend["adress"]}`},{" "}
                                        {`${friend["active"]}`}
                                    </b>
                                </p>
                                <button
                                    className="friendship"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        ))}
                    </div>
                )) || <p>you have no friends. Why don´t you find some?</p>}
            </div>
        </>
    );
}

