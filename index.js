var mysql = require('mysql');
var http = require('http');
const { Client } = require('pg');


function apiResponse(x){

  http.createServer(function(req, res){
    for(i in x){
      res.write(x)
    }
      res.end()
  }).listen(process.env.PORT || 8080);
}


function checkTables(callBack){


  var x = []

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();
  
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      // console.log(JSON.stringify(row));
      x.push(JSON.stringify(row))
      // callBack(JSON.stringify(row))
    }
    client.end();
  });

  callBack(x)

}

checkTables(apiResponse)

