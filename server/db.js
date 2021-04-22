const spicedPG = require("spiced-pg");

const db = spicedPG(
    process.env.DATABASE_URL || "postgres:gabimonteiro@localhost/finalproject"
);

/////////////////////////QUERY for register///////////////////////////