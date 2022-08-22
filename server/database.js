const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD
})

db.connect((err) => {
    if (err) {
        console.log("error", err)
    }

    // Create database DB if it doesn't exist in the MySql
    let sql = "CREATE DATABASE IF NOT EXISTS DB";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Database created");
    });

    // Use database DB
    db.query("USE DB", (err, result) => {
        if (err) throw err;
        console.log("Database SELECTED");
    })

    // Create a todos table if it doesn't exist
    sql = `CREATE TABLE IF NOT EXISTS todos (
        id INT auto_increment,
        primary key(id),
        content VARCHAR(255),
        isCompleted BOOLEAN DEFAULT false,
        isEdit BOOLEAN DEFAULT false
    )`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
})

module.exports = db;