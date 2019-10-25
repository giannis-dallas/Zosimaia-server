const express = require('express')
const app = express()
const port = 3000

const graduates = require('./assets/graduates.json')

app.get('/', (req, res) => res.send('Hey there!') )
app.get('/data', (req, res) => res.json(graduates) )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))