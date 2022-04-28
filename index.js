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
  INSERT INTO brunchesCustomerbase (firstname, lastname, email, phonenumber)
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
});

app.get('/', (req, res)=>{
  // console.log('current page is ' + req.query.page)
  const pageNumber = req.query.page
  const pageSize = 20
  const sql = `
    SELECT * 
    FROM brunchesCustomerbase 
  `
  client.query(sql, (err, response)=>{
    if (err){
      client.end();
    }
    res.send(response.rows)
  })
})

app.listen(process.env.PORT || 8080)