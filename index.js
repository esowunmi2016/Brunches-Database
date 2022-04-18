const { Client } = require('pg');

const express = require('express');
const app = express()
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

  // res.send({
  //   "First name":fname,
  //   "Last name":lname,
  //   "Email":email,
  //   "Phone number":number,
  // })


  const sql = `
    INSERT INTO customerbase(firstname, lastname, email, phonenumber)
    VALUES (${fname},${lname},${email},${number});
  `

  client.query(sql, (err, res) => {
    if (err) throw err;
    console.log(res)
    client.end();
  });

})

app.listen(process.env.PORT || 8080)


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