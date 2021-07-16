//import mysql
const mysql = require('mysql');

//import the .env file:
require('dotenv').config()


//CREATE THE CONNECTION TO THE DATABASE
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE 
});

//THEN EXPORT THE DB CONNECTION
module.exports = db;