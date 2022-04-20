const { Client } = require('pg');
var cors = require('cors')
const express = require('express');
const app = express()
app.use(cors()) 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

app.post('/', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const number = req.body.number;

  const sql = `
  INSERT INTO customerbase (firstname, lastname, email, phonenumber)
  VALUES(E'${fname}', '${lname}','${email}', '${number}');
  `
  client.query(sql, (err, res) => {
    if (err){
      client.end();
      console.log(err)
      // res.write(`error: ${err}`);
      // res.end()
    } 
    console.log(res)
    console.log('hello,,,,,,,,,,,,,,,,,,,')
    // client.end();
  });
  res.send('successful')
})

app.listen(process.env.PORT || 8080)