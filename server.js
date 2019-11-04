const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '31.22.113.24',
  user     : 'zosimaia_dbm',
  password : '#4m7l*%XPfGX',
  database : 'zosimaia_db'
});

connection.connect();

//const graduates = require('./assets/graduates.json')

connection.query('SELECT * FROM jobs', (err,rows) => {
    if(err){ console.log(err)};

    console.log('Data received from Db:');
    console.log(rows);
});

app.all('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => res.send('Hey there!') )
app.get('/data', (req, res) => res.json(graduates) )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))