//this will contain all of our action creators
//action creators i just a fucntino that returns an object
//the object that gets returned is the action
import axios from "./axios";

const BUTTON_TEXT = {
    MAKE_REQUEST: "Make friend request",
    CANCEL_REQUEST: "Cancel friend request",
    ACCEPT_REQUEST: "Accept friend request",
    UNFRIEND: "Unfriend",
};

export async function getList() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "GET_LIST",
        friendsList: data,
    };
}

export async function acceptFriend(otherUserId) {
    await axios.post("/friendship-action", {
        action: BUTTON_TEXT.ACCEPT_REQUEST,
        otherUserId: otherUserId,
    });

    return {
        type: "ACCEPT_FRIEND_REQUEST",
        otherUserId: otherUserId,
    };
}

export async function unfriend(otherUserId) {
    await axios.post("/friendship-action", {
        action: BUTTON_TEXT.UNFRIEND,
        otherUserId: otherUserId,
    });

    return {
        type: "UNFRIEND",
        otherUserId: otherUserId,
    };
}

//CHAT FUNCTIONS
// export async function addRecentMessages(data) {
//     return {
//         type: "GET_MESSAGES",
//         messagesList: data,
//     };
// }

// export async function postMessage(newMessage) {
//     return {
//         type: "POST_MESSAGES",
//         message: newMessage,
//     };
// }

// export async function deleteMessage(msgId) {
//     console.log(msgId);
//     await axios.post("/delete-comment", {
//         // action: "DELETE_MESSAGE",
//         msgId: msgId,
//     });

//     return {
//         type: "DELETE_MESSAGE",
//         msgId: msgId,
//     };
// }
