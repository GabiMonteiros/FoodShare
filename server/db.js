const spicedPG = require("spiced-pg");

const db = spicedPG(
    process.env.DATABASE_URL || "postgres:gabimonteiro@localhost/finalproject"
);

/////////////////////////QUERY REGISTER///////////////////////////

module.exports.addUser = (first, last, email, password, adress, active) => {
    const q = `
    INSERT INTO users (first, last, email, password, adress, active) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
    `;
    const params = [first, last, email, password, adress, active];
    return db.query(q, params);
};


/////////////////////////QUERY LOGIN///////////////////////////

module.exports.getUserInfo = (userEmail) => {
    const q = `
        SELECT id, email, password
        FROM users
        WHERE email = $1;
        `;
    const params = [userEmail];
    return db.query(q, params);
};

/////////////////////////QUERY RESET PASSWORD///////////////////////////

module.exports.getUserEmail = (email) => {
    const q = `
        SELECT email
        FROM users
        WHERE email = $1;
        `;
    const params = [email];
    return db.query(q, params);
};

module.exports.addCode = (email, code) => {
    const q = `
    INSERT INTO reset_codes (email, code) 
    VALUES ($1, $2);
    `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `
        SELECT *
        FROM reset_codes
        WHERE email = $1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
        ORDER BY timestamp DESC
        LIMIT 1;
        `;
    const params = [email];
    return db.query(q, params);
};

module.exports.editPassword = (email, password) => {
    const q = `
        UPDATE users 
        SET password=$2
        WHERE email=$1;
        `;
    const params = [email, password];
    return db.query(q, params);
};

/////////////////////////QUERY UPLOADER///////////////////////////

module.exports.getUserProfile = (userId) => {
    const q = `
        SELECT users.id, first, last, profile_pic, bio, adress, active 
        FROM users
        WHERE users.id = $1
        `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.editProfilePic = (userId, url) => {
    const q = `
        UPDATE users 
        SET profile_pic=$2
        WHERE id=$1
        RETURNING profile_pic;
        `;
    const params = [userId, url];
    return db.query(q, params);
};

module.exports.getOtherUserProfile = (userId) => {
    const q = `
        SELECT id, first, last, email, bio, profile_pic, adress, active
        FROM users
        WHERE id = $1;
        `;
    const params = [userId];
    return db.query(q, params);
};

/////////////////////////BIO///////////////////////////

module.exports.editBio = (userId, bio) => {
    const q = `
        UPDATE users 
        SET bio=$2
        WHERE id=$1;
        `;
    const params = [userId, bio];
    return db.query(q, params);
};

/////////////////USERS/////////////////

//checar no server se tem adress, active
module.exports.getUsers = () => {
    const q = `
        SELECT id, first, last, bio, profile_pic, adress, active
        FROM users
        ORDER BY id DESC
        LIMIT 10;
        `;
    return db.query(q);
};

module.exports.getMatchingPeople = (val) => {
    const q = `
        SELECT id, first, last, bio, profile_pic, adress, active
        FROM users
        WHERE first_name ILIKE $1 OR last_name ILIKE $1
        LIMIT 4;
        `;
    const params = [val + "%"];
    return db.query(q, params);
};

/////////////////////FRIENDSHIP///////////////////////////

module.exports.getFriendshipsStatus = (userId, otherUserId) => {
    const q = `
        SELECT * 
        FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.makeRequest = (userId, otherUserId) => {
    const q = `
        INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING sender_id, recipient_id, accepted;
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.cancelRequest = (userId, otherUserId) => {
    const q = `
        DELETE
        FROM friendships 
        WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.acceptRequest = (userId, otherUserId) => {
    const q = `
        UPDATE friendships
        SET accepted = 'true' 
        WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);
        `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.getFriendsWannabes = (userId) => {
    const q = `
        SELECT users.id, first, last, profile_pic, adress, active, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id);
        `;
    const params = [userId];
    return db.query(q, params);
};

//////////////////CHAT///////////////////////////


module.exports.getLastTenMsgs = function () {
    return db.query(`SELECT chats.id, chats.message, chats.sender_id, chats.created_at, users.first, users.last, users.profile_pic
FROM chats
JOIN users
ON chats.sender_id = users.id
ORDER BY created_at DESC
LIMIT 10`);
};

module.exports.insertMessage = function (sender_id, message) {
    return db.query(
        `INSERT INTO chats (sender_id, message)
        VALUES ($1, $2)
        RETURNING message`,
        [sender_id, message]
    );
};



module.exports.getOnlineUsers = function (arrayOfIds) {
    return db.query(
        `SELECT id, first, last, profile_pic
            FROM users
            WHERE id = ANY ($1)`,
        [arrayOfIds]
    );
};

module.exports.getPrivateChatMessages = (id) => {
    return db.query(
        `
        SELECT first, last, profile_pic, sender_id, receiver_id, private_chat.created_at, message, private_chat.id AS message_id
        FROM private_chat
        JOIN users
        ON private_chat.sender_id = users.id
        WHERE (sender_id = $1 OR receiver_id = $1)
        ORDER BY private_chat.created_at
    `,
        [id]
    );
};

module.exports.addNewPrivateMessage = (senderId, receiverId, message) => {
    return db.query(
        `
        INSERT INTO private_chat (sender_id, receiver_id, message)
        VALUES ($1, $2, $3)
        RETURNING id
    `,
        [senderId, receiverId, message]
    );
};

module.exports.getPrivateChatMessage = (messageId) => {
    return db.query(
        `
        SELECT first, last, profile_pic, sender_id, receiver_id, private_chat.created_at, message, private_chat.id AS message_id
        FROM private_chat
        JOIN users
        ON private_chat.sender_id = users.id
        WHERE private_chat.id = $1
    `,
        [messageId]
    );
};


module.exports.getUserData = function (id) {
    return db.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]);
};

//psql finalproject  -f setup.sql