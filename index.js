const express = require('express');
var http = require('http');
const { Client } = require('pg');

const app = express()


// http.createServer(function(req, res){
//     res.write('testing 1 2')
//     res.end()
// }).listen(process.env.PORT || 8080);

app.listen(process.env.PORT || 8080)

app.get('/', function(req, res){
  res.write('Ileke lo ma jeya')
})





const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// const sql = 'SELECT table_schema,table_name FROM information_schema.tables;'
// const sql = 'SELECT DB_NAME() AS Current Database;'

// const sql = 'DROP TABLE IF EXISTS example_table; '


// USED TO CREATE THE TABLE

// const sql = `CREATE TABLE customerbase (
// 	id serial PRIMARY KEY,
// 	firstname VARCHAR ( 50 ) NOT NULL,
// 	lastname VARCHAR ( 50 ) NOT NULL,
// 	email VARCHAR ( 255 ) NOT NULL,
//   phoneNumber INT NOT NULL
// );`




// client.query(sql, (err, res) => {
//   if (err) throw err;
//   // for (let row of res.rows) {
//   //   console.log(JSON.stringify(row));
//   // }
//   console.log(res)
//   client.end();
// });