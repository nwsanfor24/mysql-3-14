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
  runSearch();
  console.log("Connected!");
}); 

function runSearch() {

}

function artistSearch() {
    inquirer.prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
    }).then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        con.query(query, {
            artist: answer.artist
        }, function (err, res) {
            if (err) throw err;
            for (var i=0; i < res.length; i++) {
                console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            }
            runSearch();
        });
    });
}