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
app.get('/api/subscriptions/:id', (req, res) => { 
  let data = JSON.parse(fs.readFileSync("db.json"))
  const record = data.filter(record => record.id === parseInt(req.params.id))[0]
  res.send(record)
});
app.put('/api/subscriptions/:id', (req, res) => {
  switch (req.query.action) {
  case 'edit':
    let currentData = JSON.parse(fs.readFileSync("db.json"))
    const { name, price, frequency, description } = req.body // sanitization..
    const recordsWithUpdate = currentData.map(record => {
      if (record.id === parseInt(req.params.id)) {
        return { id: record.id, name, price, frequency, description, created_at: record.created_at, updated_at: new Date().toUTCString() }
      } else {
        return record
      }
    })
    fs.writeFileSync("db.json", JSON.stringify(recordsWithUpdate))
    res.sendStatus(200)
    break
  default:
    res.sendStatus(400)
    console.log(`Sorry, we are out of ideas..`);
  }
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

