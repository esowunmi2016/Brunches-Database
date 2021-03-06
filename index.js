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

const table = 'customerBase'

client.connect();

app.post('/', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const number = req.body.number;

  const sql = `
  INSERT INTO ${table} (firstname, lastname, email, phonenumber)
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
  const pageNumber = req.query.page === undefined ? 1:req.query.page
  
  const fname = req.query.fname === undefined || req.query.fname === '' ? '%':`%${req.query.fname}%`
  const lname = req.query.lname === undefined || req.query.lname === '' ? '%':`%${req.query.lname}%`
  const email = req.query.email === undefined || req.query.email === '' ? '%':`%${req.query.email}%`
  const number = req.query.number === undefined || req.query.number === '' ? '%':`%${req.query.number}%`

  const pageSize = 5
  const sql = `
    SELECT * 
    FROM ${table} 
    WHERE UPPER(firstname) LIKE UPPER('${fname}')
    OR Upper(lastname) LIKE UPPER('${lname}')
    OR Upper(email) LIKE UPPER('${email}')
    OR Upper(phonenumber) LIKE UPPER('${number}')
    OFFSET ${pageNumber*pageSize-pageSize} ROWS
    FETCH FIRST ${pageSize} ROW ONLY 
  `
  const sql2 = `
    SELECT COUNT(*) FROM brunchesCustomerbase
  `
  client.query(sql, (err, response)=>{
    if(err){throw err}
    console.log('1 '+response)
    console.log('2 '+response.rows)
    // res.send(response.rows)
    client.query(sql2, (err, response2)=>{
      if(err){throw err}
      console.log('3 '+response2)
      res.send({
        data:response.rows, 
        total:response2.rows[0].count,
        pageSize
      })
    })
  })
})

app.get('/excel', (req, res)=>{
  const sql = `
    SELECT * FROM ${table}
  `

  client.query(sql, (err, response)=>{
    if (err) throw err
    res.send(response)
  })
})

app.listen(process.env.PORT || 8080)