const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql');

let mainData;
let testData;

const graduates = require('./assets/graduates.json')

const connection = mysql.createConnection({
  host     : '31.22.113.24',
  user     : 'zosimaia_dbm',
  password : '#4m7l*%XPfGX',
  database : 'zosimaia_db',
  port: 3306
});
connection.connect();
connection.query('SELECT Name,Surname,YearOf,HomeAdCity_ID,Job_ID FROM graduates', (err,rows) => {
    if(err){
      console.log(err)
      throw err
    };

    console.log('Data received from Db:');
    console.log(rows[0].Name);
    testData=rows[0].Name;
    mainData=rows;
});

connection.end(); 

app.all('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => res.send('Hey there!') )
app.get('/test', (req, res) => res.send('Random test! '+ testData) )
app.get('/data', (req, res) => res.json(mainData) )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))