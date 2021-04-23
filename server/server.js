const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc"); 
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config.json");



const cookieSession = require("cookie-session");
// const { userInfo } = require("os");
//const { response } = require("express");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    // expiration date miliseconds x seconds x minutes x hours x days
});

app.use(csurf());
app.use(compression());


app.use(express.static(path.join(__dirname, "..", "client", "public")));


app.get("/home", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

/*REGISTRAGION LOGIN RESET PASSWORD*/
app.post("/home/registration", (req, res) => {
    const { first, last, email, password, status } = req.body;
    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw, status)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
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
                        Hi ${first},greetings from Social Network! 
                        Have you asked to reset your password on ${time} , right? 
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






//do not touch
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});
app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
