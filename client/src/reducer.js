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

    // if (action.type == "GET_MESSAGES") {
    //     state = {
    //         ...state,
    //         chatMessages: action.messagesList,
    //     };
    // }

    // if (action.type == "POST_MESSAGES") {
    //     state = {
    //         ...state,
    //         chatMessages: [action.message, ...state.chatMessages],
    //     };
    // }

    // if (action.type == "DELETE_MESSAGE") {
    //     console.log("actino", action);
    //     state = {
    //         ...state,
    //         chatMessages: state.chatMessages.filter((deletedMsg) => {
    //             return deletedMsg.id != action.msgId;
    //         }),
    //     };
    // }

    return state;
}
