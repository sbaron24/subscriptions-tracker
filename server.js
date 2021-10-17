const express = require('express');
const app = express();
let data = require('./db.json')
var cors = require('cors')

app.use(cors())

app.get('/api/subscriptions', (req, res) => { 
  res.json(data) 
});
app.listen(3001, () => {
  console.log('server started');
});