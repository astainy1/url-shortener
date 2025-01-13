const mysql = require('mysql2');
require('dotenv').config();

const myConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

myConnection.connect((err) => {
    if(err){
        console.error(`Error connecting to database. ${err.message}`);
        return
    }else{
        console.log(`Successfully connected to database: ${process.env.DB_DATABASE}`);
    }
})

module.exports = myConnection;