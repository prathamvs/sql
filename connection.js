// Create Connection With SQL DataBAse
var mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"developed"
});

module.exports = con;