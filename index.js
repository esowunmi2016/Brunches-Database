var mysql = require('mysql');
var http = require('http');


http.createServer(function(req, res){
    res.write('testing 1 2')
    res.end()
}).listen(process.env.PORT || 8080);