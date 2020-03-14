var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Gu!tar92",
  database: "topsongs_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "Find songs by artist",
      "Find all artist who appear more than once",
      "Find data within a specific range",
      "Search for a specific song",
      "Find artists with a top song and top album in the same year"
    ]
  }).then(function(answer) {
    switch(answer.action) {
      case "Find songs by artist":
        artistSearch();
        break;
      
      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Find artists with a top song and top album in the same year":
        songAndAlbumSearch();
        break;
    }
  });
}

function artistSearch() {
  inquirer.prompt({
    name: "artist",
    type: "input",
    message: "What artist would you like to search for?"
  }).then(function(answer) {
    var query = "SELECT position, song, year FROM top5000 WHERE ?";
    connection.query(query, { artist: answer.artist }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i.year]);
      }
      runSearch();
    });
  });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer.prompt({
    name: "start",
    type: "input",
    message: "Enter starting position: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }, 
  {
    name: "end",
    type: "input",
    message: "Enter ending position: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }
  ).then(function(answer) {
    var query = "SELECT position, song, artist, year FROM top5000 WHERE position BETWEEN ? AND ?";
    connection.query(query, [answer.start, answer.end], function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(
          "Position: " +
          res[i].position +
          " || Song: " +
          res[i].song + 
          " || Artist: " + 
          res[i].artist + 
          " || Year: " + 
          res[i].year
          );
      }
      runSearch();
    });
  });
}

