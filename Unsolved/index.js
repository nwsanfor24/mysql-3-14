var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Gu!tar92",
  database: "topsongs_DB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected! Hosting on Port: " + port);
}); 