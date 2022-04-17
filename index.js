var mysql = require('mysql');
var http = require('http');


var con = mysql.createConnection({
  host: "showemz",
  user: "root",
  password: "Arike1Ayo"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});


http.createServer(function(req, res){
    res.write('Holla mami you dey look good if you want to ride i go like to sample you')
    res.end()
}).listen(process.env.PORT || 8080);