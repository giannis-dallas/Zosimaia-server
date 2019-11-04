const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var mysql      = require('mysql');


let mainData;

var connection = mysql.createConnection({
  host     : '31.22.113.24',
  user     : 'zosimaia_dbm',
  password : '#4m7l*%XPfGX',
  database : 'zosimaia_db'
});
connection.connect();
connection.query('SELECT Name,Surname,YearOf,HomeAdCity_ID,Job_ID FROM graduates', (err,rows) => {
    if(err){ console.log(err)};

    console.log('Data received from Db:');
    console.log(rows);
    mainData=rows;
});

app.all('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => res.send('Hey there!') )
app.get('/test', (req, res) => res.send('Random test!') )
app.get('/data', (req, res) => res.send(mainData) )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))