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
        LIMIT 3;
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
