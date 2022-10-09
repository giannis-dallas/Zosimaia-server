const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql');

var mainData;
let citiesData;
let jobsData;

const newconnection = mysql.createConnection({
  host     : '31.22.113.24',
  user     : 'zosimaia_dbm',
  password : '#4m7l*%XPfGX',
  database : 'zosimaia_data',
  multipleStatements: true
});

newconnection.connect();

app.all('/newdata', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => res.send('Hey there from Zosimaia!') )

app.get('/newdata', (req, res) => {

  newconnection.query(`SELECT * FROM graduates;
    SELECT ID,location FROM locations;
    SELECT ID,job FROM jobs`
    , (err,rows) => {
        if (err) throw err ;
        let tempdata = JSON.stringify(rows[0], function(key, value) { return value == "NULL" ? "" : value });
        mainData=JSON.parse(tempdata);
        locationsData=rows[1];
        jobsData=rows[2];
        console.log(locationsData);
        result = mainData.map( (graduate) => ({
              ...graduate,
              homeLocation: graduate.Location_ID ? locationsData.find(loc => loc.ID == graduate.Location_ID).location : '',
              job : jobsData.find(job => job.ID == graduate.Job_ID) ? jobsData.find(job => job.ID == graduate.Job_ID).job : '',
              spouseJob : jobsData.find(job => job.ID == graduate.SpouseJob_ID) ? jobsData.find(job => job.ID == graduate.SpouseJob_ID).job : '',
            })
          )
    res.json(result) 
  })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
