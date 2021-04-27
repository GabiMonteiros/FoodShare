export default function reducer(state = {}, action) {
    //we will deal with the actinos here
    if (action.type == "GET_LIST") {
        state = {
            ...state,
            friendsWannabes: action.friendsList,
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map((friend) => {
                if (friend.id == action.otherUserId) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    } else if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter((unfriend) => {
                return unfriend.id != action.otherUserId;
            }),
        };
    }

    if (action.type == "GET_MESSAGES") {
        state = {
            ...state,
            messages: action.messages,
        };
    }

    if (action.type == "GET_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.message],
        };
    }

    if (action.type == "GET_ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    }

    if (action.type == "USER_LEFT") {
        console.log("onlineusers state: ", state.onlineUsers);
        console.log(
            "onlineusers state filter: ",
            state.onlineUsers.filter((user) => user.id != action.userLeft)
        );
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                (user) => user.id != action.userLeft
            ),
        };
    }

    if (action.type == "PRIVATE_CHAT_MESSAGES") {
        state = {
            ...state,
            privateChatMessages: action.chatMessages,
        };
    }
    if (action.type == "PRIVATE_CHAT_MESSAGE") {
        state = {
            ...state,
            privateChatMessages: [
                ...state.privateChatMessages,
                action.chatMessage,
            ],
        };
    }

    return state;
}