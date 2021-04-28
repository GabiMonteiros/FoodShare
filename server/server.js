const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const db = require("./db");
const { hash, compare } = require("./bc");
const {
    getLastTenMsgs,
    insertMessage,
    getOnlineUsers,
    getPrivateChatMessages,
    addNewPrivateMessage,
    getPrivateChatMessage,
    getUserData,
} = require("./db");

// create PW recovery codes
const cryptoRandomString = require("crypto-random-string");
// const secretCode = cryptoRandomString({
//     length: 6,
// });

// to, body, subject
const { sendEmail } = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
// my AWS S3 config
const { s3Url } = require("../config.json");
//chat
// creating the initial handshake between socket and our server (cannot use Express for this)
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(
            null,
            req.headers.referer.startsWith(
                "http://localhost:3000" || "https://localhost:3000"
            )
        ),//caso queira colocar online
});


///////////////////// MIDDLEWARE //////////////////

//uploader
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});



const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});



app.use(
    express.json({
        extended: false,
    })
);

const cookieSession = require("cookie-session");
// const { userInfo } = require("os");
//const { response } = require("express");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
});

app.use(cookieSessionMiddleware);
//this is socket stuff
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//ficar atenta ao combo de csurf segurança 
app.use(express.urlencoded({ extended: false }));
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());


app.use(express.static(path.join(__dirname, "..", "client", "public")));


app.get("/home", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

/////////*REGISTRAGION LOGIN RESET PASSWORD*////////////

app.post("/home/registration", (req, res) => {
    const { first, last, email, password, adress, active } = req.body; //location, status
    if (!first || !last || !email || !password || !adress || !active) {
        return res.json({ error: true });
    }
    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw, adress, active) //location, status
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    req.session.first = rows[0].first;
                    req.session.last = rows[0].last;
                    req.session.adress = rows[0].adress;
                    req.session.active = rows[0].active;
                    res.json({
                        success: true,
                        error: false,
                        userId: rows[0].id,
                        first: rows[0].first,
                        last: rows[0].last,
                        adress: rows[0].adress,
                        active: rows[0].active,
                    });
                })
                .catch((error) => {
                    console.log("error in addUser: ", error);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            if (err.routine === "_bt_check_unique") {
                res.json({ doublemail: true, error: true }); // checking if the email is unique
            }
            console.log("server side error in /register post route", err);
            res.json({ success: false });
        });
});

app.post("/home/login", (req, res) => {
    const { email, password } = req.body;
    db.getUserInfo(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                compare(password, rows[0].password)
                    .then((result) => {
                        if (result) {
                            req.session.userId = rows[0].id;
                            res.json({ error: false });
                        } else {
                            res.json({ error: true });
                        }
                    })
                    .catch((error) => {
                        console.log("error in compare password", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getUserInfo", error);
            res.json({ error: true });
        });
});



app.post("/home/reset-password/start", (req, res) => {
    const { email } = req.body;
    db.getUserEmail(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                
                db.addCode(email, secretCode)
                    .then(() => {
                        //send the email
                        var subj = "Food Share Password Reset";
                        var msg = `
                        Hi ,greetings from Food Share! 
                        Have you asked to reset your password,right? 
                        Please  use this reset code ${secretCode} ,
                        to reset your password in our social media.
                        If you don't want to reset your password, you can ignore this message
                         - someone probably typed in your username or email address by mistake.
                         Thanks!
                         Food Share Team`;
                        
                        sendEmail(email, msg, subj)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((error) => {
                                console.log("error in sendEmail", error);
                                res.json({ error: true });
                            });
                    })
                    .catch((error) => {
                        console.log("error in addCode", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getUserEmail", error);
            res.json({ error: true });
        });
});



app.post("/home/reset-password/verify", (req, res) => {
    const { email, resetCode, password } = req.body;
    db.getCode(email)
        .then(({ rows }) => {
            if (resetCode === rows[0].code) {
                console.log("alterar senha");
                hash(password).then((hashedPw) => {
                    db.editPassword(email, hashedPw)
                        .then(({ rows }) => {
                            console.log("editPassword worked", rows);
                            res.json({ success: true });
                        })
                        .catch((error) => {
                            console.log("error in editPassword", error);
                            res.json({ error: true });
                        });
                });
            } else {
                console.log("code doesnt match");
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getCode: ", error);
            res.json({ error: true });
        });
});

//////////////////////////// PROFILE//////////////////
app.get("/profile.json", (req, res) => {
    db.getUserProfile(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((error) => {
            console.log("error in /profile route - getUserProfile", error);
            res.json({ error: true });
        });
});


/////////////////////*UPLOAD*////////////////////////

app.post("/upload", uploader.single("profile_pic"), s3.upload, (req, res) => {
    console.log();
    let url = s3Url + req.file.filename;
    if (req.file) {
        console.log("url", url);
        db.editProfilePic(req.session.userId, url)
            .then(() => {
                res.json({ sucess: true, url: url });
            })
            .catch((error) => {
                console.log("Error in editProfilePic: ", error);
                res.json({ error: true });
            });
    } else {
        res.json({ error: true });
    }
});



/*/////////////////BIO /////////////////*/
app.post("/edit-bio", (req, res) => {
    const { draftBio } = req.body;
    db.editBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio,
            });
        })
        .catch((error) => {
            console.log("error in editBio", error);
            res.json({ error: true });
        });
});

app.post("/delete-bio", (req, res) => {
    const draftBio = null;
    db.editBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio,
            });
        })
        .catch((error) => {
            console.log("error in editBio", error);
            res.json({ error: true });
        });
});

//////////////////USERS/////////////////////////

app.get("/api/user/:id", (req, res) => {
    //tem q botar o /api  para renderizar o other profile com nome e bio
    const { id } = req.params;
    db.getUserProfile(id)
        .then(({ rows }) => {
            if (rows.length > 0) {
                rows[0]["loggedId"] = req.session.userId;
                rows[0].success = true;
                res.json(rows[0]);
            } else {
                res.status(404);
            }
        })
        .catch((error) => {
            console.log("/user/:id error ", error);
            res.json({ error: true });
        });
});

app.get("/lastthreeusers", (req, res) => {
    db.getUsers()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("/latest-users error ", error);
            res.json({ error: true });
        });
});

app.get("/users/:searchusers", (req, res) => {
    db.getMatchingPeople(req.params.query)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("/find-users/ error ", error);
            res.json({ error: true });
        });
});

////////////////////////////FRIENDSHIP/////////////////

app.get("/friendship-status/:otherUserId", (req, res) => {
    const { otherUserId } = req.params;
    db.getFriendshipsStatus(req.session.userId, otherUserId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("/getFriendshipsStatus ", error);
            res.json({ error: true });
        });
});

app.post("/friendship-action", (req, res) => {
    const { action, otherUserId } = req.body;
    if (action === "Make friend request") {
        db.makeRequest(req.session.userId, otherUserId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((error) => {
                console.log("error in makeRequest", error);
                res.json({ error: true });
            });
    } else if (action === "Cancel friend request" || action === "Unfriend") {
        db.cancelRequest(req.session.userId, otherUserId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((error) => {
                console.log("error in cancelRequest", error);
                res.json({ error: true });
            });
    } else if (action === "Accept friend request") {
        db.acceptRequest(req.session.userId, otherUserId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((error) => {
                console.log("error in acceptRequest", error);
                res.json({ error: true });
            });
    }
});

app.get("/friends-wannabes", (req, res) => {
    db.getFriendsWannabes(req.session.userId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("/getFriendsWannabes ", error);
            res.json({ error: true });
        });
});



//do not touch
app.get("*", function (req, res) {
    if (!req.session.userId) { //SE O USER NAO TA LOGADO deve ser direcionado /
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});
server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening in 3000.");
});

/////////CHAT///////

//this is our socket code. we will write 100% of our erver-side socket code here
let onlineUsers = {};

io.on("connection", (socket) => {
    console.log(`socket id ${socket.id} is now connected`);
    // console.log(
    //     `UserId ${socket.request.session.userId} just connected!`
    // );
    const userId = socket.request.session.userId;

    // we only do sockets when a user is logged in
    //console.log("userid: ", userId);
    if (!userId) {
        return socket.disconnect(true);
    }

    onlineUsers[socket.id] = userId;
    console.log("onlineUsers: ", onlineUsers);
    const userIds = Object.values(onlineUsers);

    getOnlineUsers(userIds).then((data) => {//
        io.sockets.emit("onlineUsers", data.rows);
    });
    
    getPrivateChatMessages(userId)//
        .then((data) => {
            io.to(socket.id).emit("privateChatMessages", data.rows);
        })
        .catch((err) => {
            console.log("err in getPrivateChatMessages: ", err);
        });

    //this will run whatever the user posts a new chat message!
    //1. INSERT new message into a our new 'chat_messages' table
    socket.on("addNewPrivateMessage", async ({ message, receiverId }) => {
        try {
            console.log("userId: ", receiverId);
            const messageId = await addNewPrivateMessage(//
                userId,
                receiverId,
                message
            ); 

            const newMessage = await getPrivateChatMessage(//
                messageId.rows[0].id
            );

            for (const key in onlineUsers) {
                if (
                    onlineUsers[key] == userId ||
                    onlineUsers[key] == receiverId
                ) {
                    io.to(key).emit("privateChatMessage", newMessage.rows[0]);
                }
            }
        } catch (err) {
            console.log("Error on addNewPrivateMessage(): ", err);
        }
    });
    getLastTenMsgs()//
        .then((data) => {
            io.sockets.emit("chatMessages", data.rows.reverse());
        })
        .catch((err) => {
            console.log("err in getLastTenMsgs: ", err);
        });

    socket.on("newMessage", (newMsg) => {
        insertMessage(userId, newMsg)//
            .then((data) => {
                // 2. emit a message back to the client

                getUserData(userId)
                    .then((data) => {
                        let infoMsg = {
                            id: data.rows[0].id,
                            first: data.rows[0].first,
                            last: data.rows[0].last,
                            profile_pic: data.rows[0].profile_pic,
                            message: newMsg,
                        };
                        io.sockets.emit("chatMessage", infoMsg);
                    })
                    .catch((err) => {
                        console.log(
                            "err in getting user data from socket.on: ",
                            err
                        );
                    });
            })
            .catch((err) => {
                console.log("err in inserMessage: ", err);
            });
    });

    socket.on("disconnect", function () {
        io.sockets.emit("userLeft", onlineUsers[socket.id]);
        delete onlineUsers[socket.id];
        
    });
});// closes io.on('connection')


















