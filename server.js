const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const graduates = require('./assets/graduates.json')

app.all('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => res.send('Hey there!') )
app.get('/data', (req, res) => res.json(graduates) )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))