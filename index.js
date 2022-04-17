var mysql = require('mysql');
var http = require('http');


var con = mysql.createConnection({
  host: "showemz",
  user: "host",
  password: "Arike1Ayo"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


http.createServer(function(req, res){
    res.write('testing 1 2')
    res.end()
}).listen(process.env.PORT || 8080);