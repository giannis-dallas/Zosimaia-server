const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql');

var mainData;
let citiesData;
let jobsData;

const connection = mysql.createConnection({
  host     : '31.22.113.24',
  user     : 'zosimaia_dbm',
  password : '#4m7l*%XPfGX',
  database : 'zosimaia_db',
  multipleStatements: true
});
connection.connect();

app.all('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => res.send('Hey there!') )
app.get('/data', (req, res) => {

  connection.query(`SELECT * FROM graduates;
    SELECT id,City_Name FROM cities;
    SELECT id,Name FROM jobs`
    , (err,rows) => {
        if (err) throw err ;
        let tempdata = JSON.stringify(rows[0], function(key, value) { return value == "NULL" ? "" : value });
        mainData=JSON.parse(tempdata);
        citiesData=rows[1];
        jobsData=rows[2];
        console.log(jobsData);
        result = mainData.map( (graduate) => ({
              ...graduate,
              homeCity: graduate.HomeAdCity_ID ? citiesData.find(city => city.id == graduate.HomeAdCity_ID).City_Name : '',
              job : jobsData.find(job => job.id == graduate.Job_ID) ? jobsData.find(job => job.id == graduate.Job_ID).Name : '',
              workCity: graduate.WorkAdCity_ID ? citiesData.find(city => city.id == graduate.WorkAdCity_ID).City_Name : '',
              spouseJob : graduate.SpouseJob_ID ? jobsData.find(job => job.id == graduate.SpouseJob_ID).Name : '',
            })
          )
    console.log(result);
    res.json(result) 
  })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))