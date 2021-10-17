const express = require('express');
const app = express();
var cors = require('cors')
const fs = require('fs')
var bodyParser = require('body-parser')

app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(express.json())

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  next()
}
app.use(logger);

app.get('/api/subscriptions', (req, res) => { 
  let data = JSON.parse(fs.readFileSync("db.json"))
  res.json(data)
});
app.post('/api/subscriptions', (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json"))
  const id = data.length + 1
  const created_at = new Date().toUTCString()
  const updated_at = new Date().toUTCString()
  const newData = { ...req.body, id, created_at, updated_at}
  data.push(newData)
  fs.writeFileSync("db.json", JSON.stringify(data))
  res.json(newData)
});

app.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

app.listen(3001, () => {
  console.log('server started');
});

