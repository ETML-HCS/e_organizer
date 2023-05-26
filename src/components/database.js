const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:"TpiHub"
})

module.exports = db;