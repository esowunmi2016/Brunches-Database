var mysql = require('mysql');
var http = require('http');


var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


http.createServer(function(req, res){
    res.write('testing 1 2')
    res.end()
}).listen(process.env.PORT || 8080);