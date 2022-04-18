var mysql = require('mysql');
var http = require('http');
const { Client } = require('pg');


http.createServer(function(req, res){
    res.write('testing 1 2')
    res.end()
}).listen(process.env.PORT || 8080);



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// var sql = 'SELECT table_schema,table_name FROM information_schema.tables;',
var sql = 'SELECT DB_NAME() AS [Current Database];'

client.query(sql, (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});